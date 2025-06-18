
import './MainPage.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";



export default function MainPage() {

  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState('');
  const [date, setDate] = useState('');
  const [amountInSourceCurrency, setamountInSourceCurrency] = useState('');
  const [amountInTargetCurrency, setamountInTargetCurrency] = useState(0);
  const[currencyNames, setCurrencyNames] = useState([]);

  const handleSubmit = async(e) => {
    e. preventDefault();
    try{
        const responce = await axios.get("http://localhost:5000/convert", {
            params: {
                date,sourceCurrency,targetCurrency,amountInSourceCurrency
            }
        })
        setamountInTargetCurrency(responce.data);

    }catch (err){
        console.error(err);
    }
  }

  //get all currency names
  useEffect(() =>{
    const getCurrencyNames = async() =>{
        try{

            const responce = await axios.get("http://localhost:5000/getAllCurrencies")
            setCurrencyNames(responce.data);

        }catch(err){
            console.error(err);
        }

    }
    getCurrencyNames();
  }, [])

  return (
    <div>
        <h1 className='text-5xl font-bold text-green-500'>💱 Smart Currency Converter</h1>
        <p>Easily convert between world currencies in real-time using the latest exchange rates. Our smart currency converter is fast, and accurate. Perfect for travelers, business professionals, and anyone needing quick currency calculations. Try it now and stay updated with the ever-changing global market.</p>

        <div>
            <section>
                <form onSubmit={handleSubmit}>
                    
                        <div className="mb-5">
                            <label htmlFor={date}> Date</label>
                            <input 
                            onChange={(e)=> setDate(e.target.value)} type="date" name= {date} id={date} required/>
                        </div>

                        <div className="mb-5">
                            <label htmlFor={sourceCurrency}> Source Currency</label>
                            <select 
                            onChange={(e)=> setSourceCurrency(e.target.value)} name={sourceCurrency} id={sourceCurrency} value={sourceCurrency}>
                                {Object.keys(currencyNames).map((currency) => (<option className='p-1' key={currency} value={currency}>
                                    {currencyNames[currency]}
                                </option>
                            ) )}
                                
                            </select>
                        </div>

                        <div className="mb-5">
                            <label htmlFor={targetCurrency}> Target Currency</label>
                            <select 
                            onChange={(e)=> setTargetCurrency (e.target.value)} name={targetCurrency} id={targetCurrency} value={targetCurrency}> 
                                {Object.keys(currencyNames).map((currency) => (<option className='p-1' key={currency} value={currency}>
                                    {currencyNames[currency]}
                                </option>
                            ) )}
                            </select>
                        </div>

                        <div className="mb-5">
                            <label htmlFor={amountInSourceCurrency}> Amount in source currency</label>
                            <input type='number' 
                            onChange={(e) => setamountInSourceCurrency (e.target.value)} name={amountInSourceCurrency} id={amountInSourceCurrency} placeholder="Amount in source currency ..." required/>
                        </div>

                        <button>Get the target Currency</button>
                    
                </form>
            </section>
        </div>
        <section className='result'>
            {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equal to {" "} {amountInTargetCurrency}
            in {currencyNames[targetCurrency]}
        </section>
    </div>
    
  )
}
