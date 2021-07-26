import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './../css/dashboard.css';
import AudioPlay from './admin/AudioPlay';
import Customers from './admin/Customers';
import Dashboard from './admin/Dashboard';
import DownloadProgress from './admin/DownloadProgress';
import Orders from './admin/Orders';
import Reports from './admin/Reports';
import SoapApiConsume from './admin/SoapApiConsume';
import VideoPlay from './admin/VideoPlay';
import Product from './product/Product'

const getComponent = (selectedTab) => {
    switch(selectedTab) {
        case 'dashboard': return <Dashboard/>
        case 'orders': return <Orders/>
        case 'customers': return <Customers/>
        case 'products': return <Product/>
        case 'reports': return <Reports/>
        case 'soapApiConsume': return <SoapApiConsume/>
        case 'videoplay': return <VideoPlay/>
        case 'audioplay': return <AudioPlay/>
        case 'downloadprogress': return <DownloadProgress/>
        default: return <Dashboard/>
    }
}

function AdminPortal(props) {
    const [selectedTab, setSelectedTab] = useState('dashboard')
    return (
        <div>
        { props.authenticated ? (
            <>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a href="#!" className={`nav-link ${selectedTab === 'dashboard'? 'active' : ''}`} aria-current="page" onClick={() => setSelectedTab('dashboard')}>
                        <span data-feather="home"></span>
                        Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className={`nav-link ${selectedTab === 'orders'? 'active' : ''}`} onClick={() => setSelectedTab('orders')}>
                        <span data-feather="file"></span>
                        Orders
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className={`nav-link ${selectedTab === 'products'? 'active' : ''}`} onClick={() => setSelectedTab('products')}>
                        <span data-feather="shopping-cart"></span>
                        Products
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className={`nav-link ${selectedTab === 'customers'? 'active' : ''}`} onClick={() => setSelectedTab('customers')}>
                        <span data-feather="users"></span>
                        Customers
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className={`nav-link ${selectedTab === 'reports'? 'active' : ''}`} onClick={() => setSelectedTab('reports')}>
                        <span data-feather="bar-chart-2"></span>
                        Reports
                        </a>
                    </li>
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Other Practice Demo</span>
                    <a className="link-secondary" href="#!" aria-label="Add a new report">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <a href="#!" className={`nav-link ${selectedTab === 'soapApiConsume'? 'active' : ''}`} onClick={() => setSelectedTab('soapApiConsume')}>
                        <span data-feather="file-text"></span>
                        SOAP API Consume
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className={`nav-link ${selectedTab === 'videoplay'? 'active' : ''}`} onClick={() => setSelectedTab('videoplay')}>
                        <span data-feather="file-text"></span>
                        Video Play
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className={`nav-link ${selectedTab === 'audioplay'? 'active' : ''}`} onClick={() => setSelectedTab('audioplay')}>
                        <span data-feather="file-text"></span>
                        Audio Play
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#!" className={`nav-link ${selectedTab === 'downloadprogress'? 'active' : ''}`} onClick={() => setSelectedTab('downloadprogress')}>
                        <span data-feather="file-text"></span>
                        Download Zip with Progress
                        </a>
                    </li>
                </ul>
            </div>
            </nav>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {
                    getComponent(selectedTab)
                }
            </main>
            </>
            ) : ''
        }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        authenticated: state.auth.authenticated,
        currentUser: state.auth.currentUser,
    }
}

export default connect(
    mapStateToProps
)(withRouter(AdminPortal))