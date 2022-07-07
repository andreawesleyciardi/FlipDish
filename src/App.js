import React , { useState , useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

import './App.scss';

import Topnavbar from './components/ui/Topnavbar';
import Main from './components/ui/Main';
import Footer from './components/ui/Footer';
import Login from './components/features/Login';




const App = React.memo(() => {
    const [credentials, setCredentials] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [bill, setBill] = useState([  ]);

    const modalClose = () => setShowModal(false);
    const modalShow = () => setShowModal(true);

    useEffect(() => {
        if ((credentials != null) && (showModal == true)) {
            setShowModal(false);
        }
    }, [ credentials ]);

    let { pathname } = useLocation();


    
    
                        //    handleAdd(item.Name, (item.ActualPrice != null ? item.ActualPrice : item.Price), 'MenuItems', item)
                        //    handleAdd(setItem.Name, setItem.Price, 'MenuItemOptionSetItems', item, set, setItem)
                        //    
                        //    const handleAdd = (name, price, type, item, set, setItem) => {
                        //        switch (type) {
                        //            case 'MenuItems':
                        //                    props.handleAddBill('add', { Name : name , Price : price , type : type });
                        //                break;
                        //            case 'MenuItemOptionSetItems':
                        //                    props.handleAddBill('add', { Name : item.Name , Price : item.Price , type : type , setItem : { Name : name , Price : price } });
                        //                break;
                        //        }
                        //    };



    const handleAddBill = (item, setItem) => {
        let lBill = ([  ]).concat(bill);
        let exist = false;
        for (const i in lBill) {
            if (lBill[i].Name == item.Name) {
                if (setItem == null) {
                    lBill[i].times = lBill[i].times + 1;
                }
                exist = true;
            }
        }
        if (exist == false) {
            item.times = 1;
            lBill.push({ Name : item.Name , Price : item.Price , times : item.times });
        }

        if (setItem != null) {
            for (const i in lBill) {
                if (lBill[i].Name == item.Name) {
                    if (lBill[i].setItems != null) {
                        let setExist = false;
                        for (const y in lBill[i].setItems) {
                            if (lBill[i].setItems[y].Name == setItem.Name) {
                                lBill[i].setItems[y].times = lBill[i].setItems[y].times + 1;
                                setExist = true;
                            }
                        }
                        if (setExist == false) {
                            lBill[i].setItems.push({ Name : setItem.Name , Price : setItem.Price , times : 1 });
                        }
                    }
                    else {
                        lBill[i].setItems = [ { Name : setItem.Name , Price : setItem.Price , times : 1 } ];
                    }
                }
            }
        }
        setBill(lBill);
    }


    const handleDeleteBill = (indexItem, indexSet) => {
        let lBill = ([  ]).concat(bill);
        if (indexSet != null) {
            if (lBill[indexItem].setItems[indexSet].times > 1) {
                lBill[indexItem].setItems[indexSet].times = lBill[indexItem].setItems[indexSet].times - 1;
            }
            else {
                lBill[indexItem].setItems.splice(indexSet, 1);
            }
        }
        else {
            if (lBill[indexItem].times == 1) {
                lBill.splice(indexItem, 1);
            }
            else {
                lBill[indexItem].times = lBill[indexItem].times - 1;
            }
        }
        setBill(lBill);
    };

    return (
        <>
            {/* JSON.stringify(bill, null, "\t") */}
            <div id="wrapper" className={ pathname.replace('/', '') }>
                <Topnavbar modalShow={ modalShow } credentials={ credentials } setCredentials={ setCredentials } bill={ bill } handleAddBill={ handleAddBill } handleDeleteBill={ handleDeleteBill } />
                <Main credentials={ credentials } handleAddBill={ handleAddBill } handleDeleteBill={ handleDeleteBill } />
                <Footer />
            </div>

            <Modal show={ showModal } onHide={ modalClose }>
                <Login setCredentials={ setCredentials } modalClose={ modalClose } />
            </Modal>
        </>
    );
});

export default App;
