import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined'
import EmojiNatureOutlinedIcon from '@mui/icons-material/EmojiNatureOutlined'
import CreditScoreIcon from '@mui/icons-material/CreditScore'
import AtmIcon from '@mui/icons-material/Atm'

import '../../styles/Whyus.scss'

const WhyUs = () => {
    return (
        <div className='traits'>
            <div className="traits_items">
              <div className="trait">
                <div className="trait_icon">
                    <AirportShuttleOutlinedIcon />
                </div>
                <div className="trait_info">
                    <h3>Express Delivery</h3>
                    <p>Get your orders delivered swiftly to your doorstep</p>
                </div>    
              </div>

              <div className="trait">
                <div className="trait_icon">
                  <AtmIcon />
                </div>
                <div className="trait_info">
                    <h3>Money Back</h3>
                    <p>Get 100% of your money back within 24 hrs of application</p>
                </div>    
              </div>

              <div className="trait">
                <div className="trait_icon">
                    <CreditScoreIcon />
                </div>
                <div className="trait_info">
                    <h3>Secure Payment</h3>
                    <p>Secure, fast and easy to use integrated payment geteway</p>
                </div>    
              </div>

              <div className="trait">
                <div className="trait_icon">
                    <SupportAgentOutlinedIcon />
                </div>
                <div className="trait_info">
                    <h3>24/7 Service</h3>
                    <p>You can contact our support staff anytime of the day for any assistance</p>
                </div>    
              </div>

            </div>
        </div>
    )
}

export default WhyUs;

