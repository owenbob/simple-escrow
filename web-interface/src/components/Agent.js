
import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import ABI from "../Abi"
import Web3 from 'web3';


const Agent = () => {
  const [buyerAddress, setBuyerAddress] = useState("")
  const [sellerAddress, setSellerAddress] = useState("")

  const handleBuyer = (event) =>{
    event.preventDefault();
    setBuyerAddress(event.target.value)
  }
  const handleSeller = (event) =>{
    event.preventDefault();
    setSellerAddress(event.target.value)
  }

  const handleSubmit =  async (event) =>{
    event.preventDefault();
    const web3 = new Web3(Web3.givenProvider);
    const contractAddress = "0x930E97f49dE6B9b970e21C4CdDaD87D421a12647"
    const escrowContract = new web3.eth.Contract(ABI, contractAddress);
    const accounts = await window.ethereum.enable();

    // Contract Owner address
    const account = accounts[0];

      // check condition
      axios.get('http://127.0.0.1:5000/set-condition')
      .then(function (response) {
        if (response.data.message === "True"){
          // transfer funds
          escrowContract.methods.releaseFunds(sellerAddress).send(
            {from: account}
          )
        }
        else{
          escrowContract.methods.revertFunds(buyerAddress).send(
            {from: account}
          )
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }

    return ( 
      <>
        <Jumbotron>
          <h1>Agent View</h1>
          <form >
          <p>
          <input placeholder="Enter Buyer Address" onChange={handleBuyer} required/>
          </p>
          <p>
            <input placeholder="Enter Seller Address" onChange={handleSeller} required/>
          </p>
          <p>
            <Button variant="primary" onClick={handleSubmit}>Send funds</Button>
          </p>
          </form>
        </Jumbotron>
      </>
    );
}
 
export default Agent;