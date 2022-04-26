import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined'
import CreditScoreIcon from '@mui/icons-material/CreditScore'
import AtmIcon from '@mui/icons-material/Atm'

import '../../styles/Whyus.scss'

const WhyUs = () => {
    return (
        <section className='traits'>
            <div className="traits_items">
              <div className="trait">
                <div className="trait_icon">
                    <div className="bubble">
                      <AirportShuttleOutlinedIcon />
                    </div>
                </div>
                <div className="trait_info">
                    <h3>Express Delivery</h3>
                    <p>Within 3 days</p>
                </div>    
              </div>

              <div className="trait">
                <div className="trait_icon">
                    <div className="bubble">
                      <AtmIcon />
                    </div>
                </div>
                <div className="trait_info">
                    <h3>Cash Returns</h3>
                    <p>Within 24 hours</p>
                </div>    
              </div>

              <div className="trait">
                <div className="trait_icon">
                    <div className="bubble">
                      <CreditScoreIcon />
                    </div>
                </div>
                <div className="trait_info">
                    <h3>Payment</h3>
                    <p>Secure system</p>
                </div>    
              </div>

              <div className="trait">
                <div className="trait_icon">
                    <div className="bubble">
                      <SupportAgentOutlinedIcon />
                    </div>
                </div>
                <div className="trait_info">
                    <h3>Support Staff</h3>
                    <p>24/7 365 Days</p>
                </div>    
              </div>

            </div>
        </section>
    )
}

export default WhyUs

