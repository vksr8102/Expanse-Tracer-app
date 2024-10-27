
import User from "../models/user.model.js";
import { checkUniqueFieldsInDatabase } from "../utils/common.js";

const userResolver ={
    
    Mutation:{
signUp: async(_,{input},context)=>{
  try {
      const {username,name,password,gender}=input
      if(!username || !name || !password || !gender){
          throw new Error('All fields are required');
      }
    
  
  const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  
  let data = {
  ...input,
  profilePicture:gender==='male'?boyProfilePic:girlProfilePic
  }
  if(username){

    const existingUser = await checkUniqueFieldsInDatabase(User,data,["username"],"REGISTER");
    if(existingUser?.isDuplicate){
        throw new Error('Username already exists');
        }
}
          const user = new User(data);
          await user.save();
          await context.login(user);
          return user;
  } catch (error) {
    console.log("error in signup",error)
    throw new Error(error || "Internal server error");
    
  }
},
login:async(_,{input},context)=>{
    try {
        
        const {username,password}=input
       const { user} = await context.authenticate("graphql-local", { username, password });
       await context.login(user);
       return user;

    } catch (error) {
        console.log("error in login",error)
        throw new Error(error || "Internal server error");
    }
},
logout:async(_,__,context)=>{
    try {
        await context.logout();
        req.session.destroy((err)=>{
            if(err){
                console.log("error in logout",err)
                throw err;
                }
        res.clearCookies("connect.sid");  
        return {message:"Logout sucessfully"}    
        })
    } catch (error) {
        console.log("error in Logout",error)
    throw new Error(error || "Internal server error");
    }

}
    } ,
    Query: {
        authUser:async(_,__,context)=>{
         try {
             
             const user = await context.getUser();
             return user;
         } catch (error) {
             console.log("error in authUser",error)
     throw new Error(error || "Internal server error");
         }
 
        },
         user:async(_,{userId})=>{
             try {
                 const user = await User.findById(userId);
                 if(!user) throw new Error("User not found");
                 return user;    
                 
             } catch (error) {
                 console.log("error in useQuery",error)
                 throw new Error(error || "Internal server error");
             }
         }
         
     }

     // TODO =>ADD USER/TRANSATION REALTION


}

export default userResolver;