const staffModel =  require('../models/staffModel')
const errModel = require('../models/errorModel')
const ErrorStatusModel = require('../models/ErrorStatusModel')
const bcrypt = require("bcrypt");
const jsreport = require('jsreport');

const getLoginPage = (req,res)=>{
        try {
            res.render("admin/login",{ layout: false })
        } catch (error) {
           console.log(error) 
           res.status(500).send("Internal servar error")
        }
}
const homepage = async (req,res)=>{
        try {
            let staffList = await staffModel.find({});
            let staffCount  = await staffModel.countDocuments();
            let errorCount = await errModel.countDocuments();
            res.render('admin/admin',{partials:true,staffList,staffCount,errorCount})
        } catch (error) {
            console.log(error)
        }
}
const doLogin =(req,res)=>{
        try {
            let admin = {
                    username: "admin",
                    role:"admin",
                    allAccess:true
            }
            console.log(admin,req.body)
            if(req.body.username == "admin" && req.body.password == "admin"){
                    req.session.admin = admin;
                    res.redirect('/admin/home')
            }
        } catch (error) {
            console.log(error)
        }
}
const getStaffpage = async(req,res)=>{
        try {
            let staffList = await staffModel.find({})
            res.render("admin/all-staffs",{partials:true,staffList})
        } catch (error) {
           console.log(error) 
            res.status(500).send("Internal server error")       
        }
}
const addStaffPage =(req,res)=>{
    try {
        res.render("admin/add-new-staffs",{partials:true})
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
}
const errorpage = async(req,res)=>{
    try {
        let errors = await errModel.find({})
        res.render("admin/view-all-questions",{partials:true,errors})
    } catch (error) {
        console.log(error)
        res.status(500).send("internal error")
    }
}
const addError =(req,res)=>{
    try {
        res.render('admin/add-question-paper',{partials:true})
    } catch (error) {
        console.log(error)
    }
}
const addErrorToDb =async (req,res)=>{
    try {
        console.log(req.body)
        let errordata = errModel.create(req.body);
        console.log("addes")
        res.redirect('/admin/getError')
    } catch (error) {
        console.log(error)
        res.status(500).send("internal error")
    }
}
const Report = (req,res)=>{
        try {
          res.render("admin/report")  
        } catch (error) {
            console.log(error)
        }
}
const logout = (req,res)=>{
    try {
       req.session.admin = null;
       res.redirect('/admin/')
    } catch (error) {
        console.log(error)
    }
}

const addStaff = async(req,res)=>{
        try {
            let {password} = req.body;
            console.log(req.body);
            password = await bcrypt.hash(password,10)
            req.body.password = password;
            let staff = await staffModel.create(req.body);
                if(staff){
                    res.redirect('/admin/getStaffPage')
                    console.log('staff added')
                }else{
                    res.staff(404).send("internal error")
                }
        } catch (error) {
            console.log(error)
            res.status(500).send("internal server error")
        }
}

const deleteStaff =async(req,res)=>{
    try {
        let deletedstaff = await staffModel.findByIdAndDelete({_id:req.params.id})
        console.log("deleted")
        res.redirect("/admin/getStaffPage")
    } catch (error) {
        console.log(error)
    }
}
const deleteError =async(req,res)=>{
    try {
        let deletederror = await errModel.findByIdAndDelete({_id:req.params.id})
        console.log("deleted")
        res.redirect("/admin/getError")
    } catch (error) {
        console.log(error)
    }
}
const viewReport = async (req, res) => {
    const PDFDocument = require('pdfkit');
    const fs = require('fs');
    try {
        let userId = req.params.userId;
        let staffdata = await staffModel.findById({ _id: userId });
        let ErrorReport = await ErrorStatusModel.find({ userId: userId });

        const doc = new PDFDocument();

        // Set the response headers for a PDF file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=${staffdata.staff_name}_Report.pdf`);

        // Pipe the PDF content directly to the response
        doc.pipe(res);

        // Add user ID as a heading
        doc.fontSize(16).text('User Name: ' + staffdata.staff_name, { align: 'center' });
        doc.moveDown();

        // Iterate over ErrorReport array
        ErrorReport.forEach((errorEntry) => {
            // Add entry-specific information
            doc.fontSize(12).text('Errors:', { align: 'center', color: 'red' });

            // Iterate over errors array
            errorEntry.errors.forEach((error) => {
                doc.fontSize(10).text('Error Id :' + error.errorId.toString(), { align: 'center' });
                doc.fontSize(10).text('Time (Seconds) :' + JSON.stringify(error.totalTime), { align: 'center' });
                doc.fontSize(10).text('Date :' + JSON.stringify(error.Solveddate), { align: 'center' });

            });

            // Add a separator
            doc.moveDown();
        });

        // End the document to finish the response stream
        doc.end();
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const allow = async (req,res)=>{
    try {
            let id = req.params.id;
            let updateStatus = await staffModel.findByIdAndUpdate({_id:id}, { status: 'online' },) 
            res.redirect('/admin/home')
    } catch (error) {
       console.log(error) 
    }
}
const Makelogout = async (req,res)=>{
    try {
        let id = req.params.id;
        let updateStatus = await staffModel.findByIdAndUpdate({_id:id}, { status: 'offline' },) 
        res.redirect('/admin/home')
    } catch (error) {
        
    }
}
const allowAll = async(req,res)=>{
    try {
        const updateStatus = await staffModel.updateMany({}, { $set: { status: 'online' } });      
        res.redirect('/admin/home')
        
    } catch (error) {
        console.log(error)
    }
}
const makeAdmin= async(req,res)=>{
        try {
            let id = req.params.id;
            let user = await staffModel.findById({_id:id});
                if(user.role === 'admin'){
                    let updateStatus = await staffModel.findByIdAndUpdate({_id:id}, { role: 'user' },)      
                }else{
                    let updateStatus = await staffModel.findByIdAndUpdate({_id:id}, { role: 'admin' },)      

                }
            res.redirect('/admin/home')
        } catch (error) {
            console.log(error)
        }
}
module.exports ={
    getLoginPage,
    homepage,
    doLogin,
    getStaffpage,
    addStaffPage,
    errorpage,
    addError,
    Report,
    addStaff,
    logout,
    addErrorToDb,
    deleteStaff,
    deleteError,
    viewReport,
    allow,
    allowAll,
    Makelogout,
    makeAdmin
}