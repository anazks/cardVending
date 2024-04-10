function countAllUsers(usersArray, targetUserId) {
    const userMap = {};                                                           // Create a map to store the relationships between users
  
    usersArray.forEach(userObj => {                                               // Populate the userMap with the relationships
      userMap[userObj.userId] = {
        left: userObj.left_side_user,
        right: userObj.right_side_user
      };
    });
  
    function countUsersRecursively(userId) {
      if (userId === null || userMap[userId] === undefined) {
        return 0;
      }
  
      const leftCount = countUsersRecursively(userMap[userId].left);
      const rightCount = countUsersRecursively(userMap[userId].right);
  
      return 1 + leftCount + rightCount;
    }
  
    return countUsersRecursively(targetUserId);
  }
  
  function countSideUsers(usersArray, targetUserId, side){
    let parentUser = usersArray.find(obj => obj.userId.equals(targetUserId));
    if(side === "left"){
      if(parentUser.left_side_user !== null){
        return countAllUsers(usersArray, parentUser.left_side_user);
      }
      return 0;
    }else{
      if(parentUser.right_side_user !== null){
        return countAllUsers(usersArray, parentUser.right_side_user);
      }
      return 0;
    }
  }

  function findLeftExtremeUser(usersArray, targetUserId) {
    const userMap = {};                                                           // Create a map to store the relationships between users
  
    usersArray.forEach(userObj => {                                               // Populate the userMap with the relationships
      userMap[userObj.userId] = userObj.left_side_user;
    });
  
    let currentUserId = targetUserId;                                             // Find the left extreme user
    let leftExtremeUser = null;
  
    while (currentUserId !== null && userMap[currentUserId] !== undefined) {
      leftExtremeUser = currentUserId;
      const nextUserId = userMap[currentUserId];
      delete userMap[currentUserId];                                              // Remove the edge to avoid revisiting the same relationship
      currentUserId = nextUserId;
    }
  
    return leftExtremeUser;
  }
  function findRightExtremeUser(usersArray, targetUserId) {
    const userMap = {};                                                           // Create a map to store the relationships between users
  
    usersArray.forEach(userObj => {                                               // Populate the userMap with the relationships
      userMap[userObj.userId] = userObj.right_side_user;
    });
  
    let currentUserId = targetUserId;                                             // Find the left extreme user
    let leftExtremeUser = null;
  
    while (currentUserId !== null && userMap[currentUserId] !== undefined) {
      leftExtremeUser = currentUserId;
      const nextUserId = userMap[currentUserId];
      delete userMap[currentUserId];                                              // Remove the edge to avoid revisiting the same relationship
      currentUserId = nextUserId;
    }
  
    return leftExtremeUser;
  }

module.exports = {
    countAllUsers,
    countSideUsers,
    findLeftExtremeUser,
    findRightExtremeUser
}