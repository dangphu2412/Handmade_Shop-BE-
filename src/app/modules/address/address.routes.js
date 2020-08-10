import express from "express";
import AddressHandler from "./address.handler";

const router = express.Router();

router.get("/users/addresss", AddressHandler["getAddresses"]());

router.post("/users/addresss", AddressHandler["createAddress"]());

router.delete("/users/address", AddressHandler["deleteAddress"]());

export default router;
