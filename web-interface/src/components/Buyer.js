import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import ABI from "../Abi"
import Web3 from 'web3';


const Buyer = () => {
  const [check, setCheck] = useState(false);
  const [address, setAddress] = useState("")
  const handleCheck = (event) =>{
    setCheck(event.target.checked)
  }

  const handleChange = (event) =>{
    event.preventDefault();
    setAddress(event.target.value)

  } 
  const handleSubmit =  async (event) =>{
    event.preventDefault();
    const web3 = new Web3(Web3.givenProvider);
    const contractAddress = "0x930E97f49dE6B9b970e21C4CdDaD87D421a12647"
    const escrowContract = new web3.eth.Contract(ABI, contractAddress);
    const accounts = await window.ethereum.enable();
    const account = accounts[1];

    if (check === true) {
      // set condition
      axios.post('http://127.0.0.1:5000/set-condition')
      .then(function (response) {
        // handle success
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
    
    // transfer funds
    escrowContract.methods.depositFunds(address).send(
      {from: account}
    )
  }

  
    return ( 
      <>
       <Jumbotron>
          <h1>Buyer View</h1>
          <form >
          <p>
          <label for="condition"> 
          Set condition   <input type="checkbox" id="condition" onClick={handleCheck}/>
          </label>
          </p>
          <p>
            <input placeholder="Enter Seller Address" onChange={handleChange} required/>
          </p>
          <p>
            <Button variant="primary" onClick={handleSubmit}>Send funds</Button>
          </p>
          </form>
        </Jumbotron>
      </>
    );
}

export default Buyer;
