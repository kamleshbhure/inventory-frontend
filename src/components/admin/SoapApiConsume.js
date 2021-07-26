import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { getProductDetailsSoapAPI } from '../../util/APIUtils';
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function SoapApiConsume() {

    const [searchStr, setSearchStr] = useState(0);    
    const [productId, setProductId] = useState(0);
    const [productDetails, setProductDetails] = useState({});

    const soapAPICall = (productId) => {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'http://localhost:8090/soap-api/service/products', true);

        // build SOAP request
        var request =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'+
            '<SOAP-ENV:Header/>'+
            '<SOAP-ENV:Body>'+
              '<ns2:ProductDetailsRequest xmlns:ns2="http://com/localhost/webservices/productservice">'+
                '<ns2:productNumber>'+productId+'</ns2:productNumber>'+
              '</ns2:ProductDetailsRequest>'+
            '</SOAP-ENV:Body>'+
          '</SOAP-ENV:Envelope>';

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    alert(xmlhttp.responseText);
                    // alert('done. use firebug/console to see network response');
                }
            }
        }
        // Send the POST request
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.setRequestHeader('Access-Control-Allow-Origin', true);
        
        xmlhttp.send(request);
    }

    useEffect(() => {
        if (productId !== 0) {
            getProductDetailsSoapAPI(productId)
                .then((response) => {
                    setProductDetails(response)                    
                }).catch((error) => {
                    console.log(error);
                });
            soapAPICall(productId)
        }
    }, [productId]);
    return (
        <div className="col-sm mt-4">
            <div className="row">
                <div className="col-sm-10">
                    <h2>SOAP API Consume</h2>
                </div>
            </div>
            <section className="border p-4 mb-4 d-flex justify-content-center align-items-center flex-column">
                <div>
                    <div className="input-group">
                        <input type="search" id="search" placeholder="Search" className="form-control" onChange={e=>setSearchStr(e.target.value)} />
                        <button type="button" className="btn btn-primary" onClick={()=>setProductId(searchStr)} >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
            </section>
            {/* { productDetails.id?  */}
            <><div className="row">
                <div className="col-lg-12">
                    <div className="m-b-md">
                        <h2>{productDetails.productName}</h2>
                    </div>
                    <dl className="dl-horizontal">
                        <dt>Status:</dt> <dd><span className="label label-primary">{productDetails.productStatus}</span></dd>
                    </dl>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-5">
                    <dl className="dl-horizontal">
                        <dt>ID:</dt> <dd>{productDetails.productNumber}</dd>
                        <dt>Brand:</dt> <dd>{productDetails.productBrand}</dd>
                        <dt>Price:</dt> <dd>{productDetails.productPrice}</dd>
                        {/* <dt>Made In :</dt><dd>{productDetails.madein} </dd> */}
                    </dl>
                </div>
            </div></>
             {/* : ''} */}
        </div>
    );
}

export default SoapApiConsume;