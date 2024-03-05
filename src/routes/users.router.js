import { Router } from "express";

import UserManagerDB from "../dao/UserManagerDB.js";

const usersRouter = Router();

usersRouter.post("/register", async (req, res) => {
  try {
    const userManager = new UserManagerDB();
    const resp = await userManager.registerUser(req.body);
    res.redirect("/login");
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});    
  }
});

usersRouter.post("/login", async (req, res) => {
  try {
    const userManager = new UserManagerDB();
    const resp = await userManager.login(req.body);
    if(resp.status === "success"){
      req.session.user = {
        name: resp.payload.email,
        rol: resp.payload.rol
      }
      res.redirect("/products")
    }else{
      res.send(resp);
    }
  } catch (error) {
    res.send({status: "error", message: "Error en ejecución, " + error});    
  }
});

usersRouter.get("/logout", (req,res)=>{
  req.session.destroy(error => {
    if(!error){
      res.redirect("/login");
    }else{
      res.send ({status: "error", message: "Error en logout, " + error});
    }  
  })
});


export default usersRouter;