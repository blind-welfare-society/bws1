import { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "@/lib/axios";

const ContributeForm = (props: any) => {
    const preferredSlot = props.preferred_slot;
    const products = props.products;
    const donationAmount = props.donation_amount;
    const formattedProducts = props.formattedProducts;

    const [totalDonationAmount, setTotalDonationAmount] = useState(donationAmount);

    const chooseDonationAmount = (amount: any) => {
        setTotalDonationAmount(amount);
    // Pass selected slot amount up to reset counts in parent
    };

    return (
        <form className="campaign_donation_payment">
        <input type="hidden" name="campaign_id" value={props.project_id} />
        <div className='donate-amount-placeholder'>
        <ul>
        {
            preferredSlot.map((item: any) => 
                <li onClick={() => chooseDonationAmount(item)} data-value={item} key={item.id}>₹ {item}</li>
            )    
        }  
        </ul>                    
        </div>  
        <div className="donate_amount_field">
            <div className="donate_currency">₹</div>
            <input type="number" name="donation_amount" className="form-control amount" min="500" value={totalDonationAmount || donationAmount} placeholder="Enter other amount - ₹500 or more" required />
        </div>  
        {formattedProducts?.map((item: any) => (
           <input type="hidden" name="frm_products[]" value={item} id="" className="frmProductDesc" key={item.id} /> 
        ))}
        
        <p className='form_desc'>Filling up all the details below is mandatory!</p>
        <div className="form-group row">
            <div className="col-md-12">
                <input type="text" className="form-control" id="full_name" value="" name="full_name" placeholder="Full Name" required />
            </div>
            <div className="col-md-12">
                <input type="email" className="form-control" id="email" value="" name="email" placeholder="Email" required />        
            </div>
            <div className="col-md-12">
                <input type="tel" className="form-control" id="phone" value="" name="phone" placeholder="Phone Number" required />        
            </div> 
        </div>  
        <p className='form_desc2'>
            <strong>Contribution Appearance</strong> <br />Choose a name to be displayed publicly next to your contribution on the Supporter list of the campaign page or choose to be an Anonymous wellwisher.
        </p>
        <div className="row form-group">
            <div className="col-md-12">
                <div className="name_display_wrap">
                    <label>
                        <input type="radio" name="contributor_name_display" value="full_name" checked /> Full Name 
                    </label> 
                    <label>
			            <input type="radio" name="contributor_name_display" value="anonymous"  /> Anonymous
		            </label>    
                </div>     
            </div>
        </div>
        <div className="form-group row">
            <div className="col-md-12">
                <label style={{ fontSize: '12px' }}>I need 80G exempted donation receipt.</label> 
                <div className="name_display_wrap">
                    <label>
                        <input type="radio" name="form_80G" className='form_80G' value="0" checked /> No
                    </label> 
                    <label>
                        <input type="radio" name="form_80G" className='form_80G' value="1"  /> Yes
                    </label>    
                </div>    
            </div>   
        </div>
        <div id="80gInfo" style={{ display: 'none' }}>
            <div className="form-group row">
                <div className="col-md-12">
                    <label htmlFor="pan">Your PAN<span className="required" title="This field is required.">*</span></label>
                    <input type="text" className='form-control req' name="pan" id="pan" placeholder='Required for income tax exemption under section 80G' />
                </div>
            </div>        
            <h4 className='my-10'>Billing Information</h4>
            <div className="form-group row">
                <div className="col-md-12">
                    <label htmlFor="address">Your Address <span className='required' title='This field is required.'>*</span></label>        
                    <input type="text" name="address" id="address" className='form-control req' placeholder='Address' />    
                </div>
            </div>  
            <div className="form-group row">
                <div className="col-md-6">
                    <label htmlFor="country">Select your Country <span className='required' title='This field is required.'>*</span></label>        
                    <input type="text" name="country" id="country" className='form-control req' placeholder='Country' />    
                </div>
                <div className="col-md-6">
                    <label htmlFor="city">City <span className='required' title='This field is required.'>*</span></label>        
                    <input type="text" name="city" id="city" className='form-control req' placeholder='City' />    
                </div>
            </div>  
            <div className="form-group row">
                <div className="col-md-6">
                    <label htmlFor="state">Enter Your State <span className='required' title='This field is required.'>*</span></label>        
                    <input type="text" name="state" id="state" className='form-control req' placeholder='State' />    
                </div>
                <div className="col-md-6">
                    <label htmlFor="pincode">Zip Code <span className='required' title='This field is required.'>*</span></label>        
                    <input type="text" name="pincode" id="pincode" className='form-control req' placeholder='pincode' />    
                </div>
            </div> 
        </div>
        <p style={{ fontSize: '.92rem' }} className='mb-1'><strong>All payments go through a secure gateway</strong></p>
        <div className="donate-form-button">
            <button type="submit" className="btn btn-primary btn-block btn-lg"><i className="fa fa-heart" aria-hidden="true"></i>&nbsp;Donate Now</button>
        </div>
        </form>
    )
}

export default ContributeForm;