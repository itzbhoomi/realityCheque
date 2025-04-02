"use server"
import { unique } from "next/dist/build/utils"
import prisma from "./lib/prisma"
import { useState,useEffect } from "react"

export async function createUser(firstName:string,  Email:string, Password:string, lastName?:string,) {
    return await prisma.user.create({
        data:{
            firstName,
            lastName,
            Email,
            Password
        }
    })
    
}
