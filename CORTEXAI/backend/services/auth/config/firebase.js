import admin from "firebase-admin";
import {cert,initializeApp} from "firebase-admin/app";
import serviceAccount from "./serviceAccountKey.json" with {type:"json"}


const app=admin.initializeApp({
    credential:cert(serviceAccount),
})