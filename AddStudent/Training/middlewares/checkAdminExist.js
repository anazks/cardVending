

const checkAdminExist = async () => {
    try {
        let admin = await adminModel.findOne({});
        if (admin) {
            // console.log(admin)
            return true;
        } else {
            let createdAt = new Date().toLocaleDateString();
            let adminCredential = {
                userName: "admin",
                password: "admin",
                company: "Winxzone",
                createdAt
            };
            let admin = await adminModel.create(adminCredential);
            const sponsor = await sponsorModel.create({ userId: admin._id, userStatus:"Active"});
            if (sponsor) {
                console.log("sponsor created")
            }
            console.log(admin, "admin Created");
            return true;
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = checkAdminExist;