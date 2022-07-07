import React , { useState , useEffect , useRef } from 'react';
import axios from 'axios';
import { Container , Row , Col , Button } from 'react-bootstrap';

import { Brand , Currency } from './../Utilities';
import menuObj from './menuObj.json';



const Menu = React.memo((props) => {
    const firstRenderRef = useRef(true);
    const [menu, setMenu] = useState(null);

    const getMenu = () => {
        axios.get((process.env.NODE_ENV === "production" ? 'https://menus.flipdish.co/prod/16798/e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json' : 'e6220da2-c34a-4ea2-bb51-a3e190fc5f08.json'))
            .then(
                (response) => {
                    setMenu(response.data);
                }
            )
            .catch(
                (error) => {
                    setMenu(false);
                }
            );
    };

    useEffect(() => {
        if (firstRenderRef.current == true) {
            firstRenderRef.current = false;
            getMenu();
        }
    }, [  ]);

    const renderItem = (item) => (
        <>
            <span className="name item-name">{ item.Name }</span>
            {
                ((item.Price != 0) && (item.ActualPrice))
                &&
                    <span className="price item-price">{ (item.ActualPrice != null ? item.ActualPrice : item.Price) + ' ' + Currency }</span>
            }
        </>
    );

    return (
        <>
            <div className="menu-title">
                <h1 className=" title">{ Brand }</h1>
                <p>RESTAURANT</p>
            </div>
            {
                menu == false ?
                    <p>It was not possible to retreive the data regarding this Menu.</p>
                :
                    (
                        ((menu == null) || (menu.MenuSections.length == 0)) ?
                            ''
                        :
                            (
                                <div id="menu-feature">
                                    {
                                        ((menu.MenuSections.filter(section => ((section.IsAvailable == true) && (section.IsDeleted == false) && (section.IsHiddenFromUsers == false) && (section.MenuItems.length > 0)))).sort((sectionA, sectionB) => { return sectionA.DisplayOrder - sectionB.DisplayOrder}) ).map((section, index) => {
                                            return (
                                                <section key={ section.MenuSectionId }>
                                                    <header>
                                                        <div>
                                                            <div className="container-image">
                                                                <div className="sectionImage" style={ { backgroundImage : (section.ImageUrl != null ? ('url(' + section.ImageUrl + ')') : 'none') } }></div>
                                                            </div>
                                                            <h2 className="title">{ section.Name }</h2>
                                                        </div>
                                                    </header>
                                                    <div>
                                                        {
                                                            ((section.MenuItems.filter(item => ((item.IsAvailable == true) && (item.IsDeleted == false)))).sort((itemA, itemB) => { return itemA.DisplayOrder - itemB.DisplayOrder}) ).map((item, index) => {
                                                                return (
                                                                    <div className={ 'container-section-item' + (item.MenuItemOptionSets.length > 0 ? ' hasSet' : '') } key={ item.MenuItemId }>
                                                                        <div className={ 'container-section-item-header' + (item.ImageUrl == null ? ' hasNotImage' : '') }>
                                                                            {
                                                                                item.ImageUrl != null
                                                                                &&
                                                                                    <div className="sectionItemImage" style={ { backgroundImage : ('url(' + item.ImageUrl + ')') } }></div>
                                                                            }
                                                                            <div className="sectionItemData">
                                                                                {
                                                                                    item.MenuItemOptionSets.length == 0 ?
                                                                                        <a className="btn btn-link" onClick={ (e) => ( props.handleAddBill(item) ) }>
                                                                                            {
                                                                                                renderItem(item)
                                                                                            }
                                                                                        </a>
                                                                                    :
                                                                                        <h3>
                                                                                            {
                                                                                                renderItem(item)
                                                                                            }
                                                                                        </h3>
                                                                                }
                                                                                {/*<Button variant="primary" className="btn" onClick={ (e) => { handleAdd(index) } }><p className="delete-icon">Add</p></Button>*/}
                                                                                {
                                                                                    ((item.Description != null) && (item.MenuItemOptionSets.length == 0))
                                                                                    &&
                                                                                        <label className="item-description">{ item.Description }</label>
                                                                                }
                                                                                
                                                                            </div>
                                                                        </div>
                                                                        {
                                                                            item.MenuItemOptionSets.length > 0
                                                                            &&
                                                                                <>
                                                                                    {
                                                                                        (item.Description != null)
                                                                                        &&
                                                                                            <label className="item-description">{ item.Description }</label>
                                                                                    }
                                                                                    <div className="container-section-item-set">
                                                                                        {
                                                                                            ((item.MenuItemOptionSets.filter(set => (set.IsDeleted == false))).sort((setA, setB) => { return setA.DisplayOrder - setB.DisplayOrder}) ).map((set, index) => {
                                                                                                return (
                                                                                                    <div className="container-section-item-set-setItem" key={ set.MenuItemOptionSetId }>
                                                                                                        {
                                                                                                            ((set.MenuItemOptionSetItems.filter(setItem => ((setItem.IsAvailable == true) && (setItem.IsDeleted == false)))).sort((setItemA, setItemB) => { return setItemA.DisplayOrder - setItemB.DisplayOrder}) ).map((setItem, index) => {
                                                                                                                return (
                                                                                                                    <div key={ setItem.MenuItemOptionSetItemId }>
                                                                                                                        <a className="btn btn-link" onClick={ (e) => ( props.handleAddBill(item, setItem) ) }><span className="name setItem-name">{ setItem.Name }</span> <span className="price setItem-price">{ (set.IsMasterOptionSet == false ? '+' : '') + setItem.Price + ' ' + Currency }</span></a>
                                                                                                                    </div>
                                                                                                                )
                                                                                                            })
                                                                                                        }
                                                                                                    </div>
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </div>
                                                                                </>
                                                                        }
                                                                    </div>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </section>
                                            );
                                        })
                                    }
                                </div>
                            )
                    )
            }
        </>
    );
});

export default Menu;
