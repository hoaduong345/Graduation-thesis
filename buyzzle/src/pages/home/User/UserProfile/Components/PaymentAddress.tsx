import { ChangeEvent, Fragment, useState, useEffect } from 'react'
import Container from '../../../../../components/container/Container'
import { ChangeHandler, Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

type FormValues = {
    username: string,
    name: string,
    email: string,
    sex: string,
    phonenumber: number,
    dateOfBirth: string,
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
    // fullName: string,
    // Address: string
}

export default function PaymentAddress(){

}