import React from 'react';
import { NavLink } from "react-router-dom";
import { Navbar , Nav , Button , NavDropdown } from 'react-bootstrap';

import { Currency } from './../Utilities';
import logoWhite from '../../imgs/logo-white.png';
import logoBlack from '../../imgs/logo-black.png';



const Topnavbar = React.memo((props) => {
	let { modalShow , credentials , setCredentials } = props;

	const totalBill = props.bill.length == 0 ? 0 : props.bill.reduce((accumulator, object) => (
  		accumulator + (object.Price * object.times) + (((object.setItems == null) || (object.setItems.length == 0)) ? 0 : object.setItems.reduce((accumulatorSet, objectSet) => ( accumulatorSet + (objectSet.Price * objectSet.times) ), 0))
	), 0);
	
  	return (
	    <header id="topnavbar">
	    	<Navbar expand="lg" variant="dark">
		    	<Navbar.Brand href="/">
		    		<img src={ logoWhite } alt="logo" />
		    	</Navbar.Brand>
		    	
		    	<Navbar.Toggle aria-controls="basic-navbar-nav"/>
		    	
		    	<Navbar.Collapse id="navbar-menu" className="justify-content-end">
			    	<NavLink className="px-3" to="/menu">Menu</NavLink>
			    	<NavLink className="px-3" to="/developer">Andrea Ciardi</NavLink>
			    	<NavDropdown className="container-drowdown-bill" id="dropdown-bill" title={ <p><span>Total:</span> <span>{ (Math.round(totalBill * 100) / 100).toFixed(2) + ' ' + Currency }</span></p> } align="end" autoClose={ false }>
				    	<NavDropdown.Item as="div" className="logo-receipt">
				    		<img src={ logoBlack } alt="logo receipt" />
				    	</NavDropdown.Item>
				    	<NavDropdown.Divider />
				    	{
				    		(props.bill).map((item, indexItem) => (
				    			<NavDropdown.Item as="div" key={ item.Name }>
				    				<div className="receipt-item-container">
					    				<p>
					    					<span className="receipt-item">{ item.Name } 
					    						{
					    							item.setItems == null
					    							&&
					    								<label>{ '[ x' + item.times + ' ]' }</label>
					    						}
					    					</span>
					    					{
					    						((item.Price != null) && (item.Price != 0))
					    						&&
					    							<span>{ (Math.round((item.times * item.Price) * 100) / 100).toFixed(2) + ' ' + Currency }</span>
					    					}
					    				</p>
					    				<Button variant="link" className="btn btn-dropdown-item" onClick={ (e) => { props.handleDeleteBill(indexItem) } }><p className="delete-icon">-</p></Button>
					    			</div>
					    			{
				    					item.setItems != null
				    					&&
							    			<div className="receipt-itemSet-container">
							    				{
						    						item.setItems.map((itemSet, indexSet) => (
						    							<div key={ itemSet.Name }>
							    							<p>
								    							<span className="receipt-itemSet">
								    								{ itemSet.Name }<label>{ '[ x' + itemSet.times + ' ]' }</label>
								    							</span>
								    							{
										    						itemSet.Price != null
										    						&&
										    							<span>{ (Math.round((itemSet.times * itemSet.Price) * 100) / 100).toFixed(2) + ' ' + Currency }</span>
										    					}
							    							</p>
							    							<Button variant="link" className="btn btn-dropdown-item" onClick={ (e) => { props.handleDeleteBill(indexItem, indexSet) } }><p className="delete-icon">-</p></Button>
							    						</div>
						    						))
						    					}
							    			</div>
							    	}
				    			</NavDropdown.Item>
				    		))
				    	}
				    	{
				    		props.bill.length == 0
				    		&&
				    			<NavDropdown.Item as="p">No products selected</NavDropdown.Item>
				    	}
				    	<NavDropdown.Divider />
				    	<NavDropdown.Item className="total-bill" onClick={ (e) => { alert('Ordered'); } }><span>Total:</span> <span>{ (Math.round(totalBill * 100) / 100).toFixed(2) + ' ' + Currency }</span></NavDropdown.Item>
			    	</NavDropdown>
			    	<Nav.Item className="ms-3">
			    		{
			    			credentials == null ?
			    				<Button id="btn-login" variant="primary" onClick={ modalShow }>Login</Button>
			    			:
			    				<Button id="btn-logout" variant="link" onClick={ (e) => setCredentials(null) }>Logout</Button>
			    		}
			    	</Nav.Item>
		    	</Navbar.Collapse>
		    </Navbar>
	    </header>
  	);
});

export default Topnavbar;