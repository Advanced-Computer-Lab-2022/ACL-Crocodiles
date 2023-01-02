import React from 'react';
import {jsPDF} from "jspdf";
const certificate = () => {
  const cert = new jsPDF('landscape',"pt","a4");
  const handleGeneratePdf = async () =>{
    cert.html(document.querySelector('#certificate')).then(()=>{
      cert.save("certificate.pdf");

    })
  
  }
    
    return (<div>
      <button className="button" onClick={handleGeneratePdf}>
				Generate PDF
			</button>
      <div>
        <body id="certificate" >
        <div  class="container pm-certificate-container">
          <div class="outer-border">   <div class="inner-border">
                  
          <div class="pm-certificate-border col-xs-12">
            <div class="row pm-certificate-header">
              <div class="pm-certificate-title cursive col-xs-12 text-center">
                <h2>Acl Crocs Certificate of Completion</h2>
              </div>
            </div>
      
            <div class="row pm-certificate-body">
              
              <div class="pm-certificate-block">
                  <div class="col-xs-12">
                    <div class="row">
                      <div class="col-xs-2"></div>
                      <div class="pm-certificate-name underline margin-0 col-xs-8 text-center">
                        <span class="pm-name-text bold">[NAME]</span>
                      </div>
                      <div class="col-xs-2"></div>
                    </div>
                  </div>          
      
                  <div class="col-xs-12">
                    <div class="row">
                      <div class="col-xs-2"></div>
                      <div class="pm-earned col-xs-8 text-center">
                  
      
                      </div>
                      <div class="col-xs-2"></div>
                      <div class="col-xs-12"></div>
                    </div>
                  </div>
                  
                  <div class="col-xs-12">
                    <div class="row">
                      <div class="col-xs-2"></div>
                      <div class="pm-course-title col-xs-8 text-center">
                        <span class="pm-earned-text block cursive">while completing the course entitled</span>
                      </div>
                      <div class="col-xs-2"></div>
                    </div>
                  </div>
      
                  <div class="col-xs-12">
                    <div class="row">
                      <div class="col-xs-2"></div>
                      <div class="pm-course-title underline col-xs-8 text-center">
                        <span class="pm-credits-text block bold sans">[COURSE NAME]</span>
                      </div>
                      <div class="col-xs-2"></div>
                    </div>
                  </div>
              </div>       
              
              <div class="col-xs-12">
                <div class="row">
                  <div class="pm-certificate-footer">
                      <div class="col-xs-4 pm-certified col-xs-4 text-center">
                   
                        <span class="bold block">Nayer Kotry CEO, Staff Development</span>
                      </div>
                    
                      <div class="col-xs-4 pm-certified col-xs-4 text-center">
                        <span class="pm-credits-text block sans">Date Completed: [DATE]</span>
                    
                
                      </div>
                  </div>
                </div>
              </div>
      
            </div>
      
          </div>
            </div></div>
       
    
        </div>
      </body>
      </div>
      </div>
    );
};

export default certificate;