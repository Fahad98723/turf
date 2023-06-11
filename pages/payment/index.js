import React, { useState } from "react";
import Navbar from "../../components/Sharerd/Navbar/Navbar";

const Payment = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = () => {
    // Call the bKash API with the necessary information (e.g., amount, merchant details)
    // Handle the response from the API to proceed with the payment
    // Implement the necessary logic to redirect the user to the bKash payment page
    // For example, you can use window.location.href = response.paymentUrl;
  };
  return (
    <div className="max-w-[1450px] mx-auto">
      <Navbar />
      <img
        src={
          "https://www.nop-station.com/images/uploaded/Products/bKash-Payment.png"
        }
        alt="bKash Logo"
        style={{ width: "100%" }}
      />
      <form>
        <div className="shrink   md:w-2/4 w-full   text-base font-normal text-slate  first-letter:transition ease-in-out m-0 focus:outline-none mt-1 mr-2">
          <p className="text-base mb-1 text-[#333333] ">Amount</p>
          <input
            type="text"
            autoFocus
            className="text-base bg-[#F6F6F6] p-3 focus:outline-none border-2 border-solid border-light-gray  w-full"
            placeholder="Enter your phone number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </div>
        <button className="rounded border-2 mt-3" type="button" onClick={handlePayment}>
          <img
            src="https://download.logo.wine/logo/BKash/BKash-bKash-Logo.wine.png"
            alt="Pay with bKash"
            style={{ width: "100px", height:'50px' }}
          />
        </button>
      </form>
    </div>
  );
};

export default Payment;
