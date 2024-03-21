import React, { useEffect, useState } from "react";
import inventoryService from "../services/inventory";
import WeightClassPriceUpdater from "./WeightClassPriceUpdater";

const Inventory = ({ returnClickHandle, title }) => {
    const [inventoryData, setInventoryData] = useState([]);
    const [metalData, setMetalData] = useState([]);
    const [goldBalance, setGoldBalance] = useState(0);
    const [nonGoldWeight, setNonGoldWeight] = useState(0);
    const [weightClassPrices, setWeightClassPrices] = useState([]);
    const [display, setDisplay] = useState(false);
    const [weightAndPrice, setWeightAndPrice] = useState({ weight: '', price: 0 });

    useEffect(() => {
        inventoryService.getAllInventoryData()
            .then(data => {
                setInventoryData(data.inventoryData);
                setMetalData(data.metalData.slice(1));
                return data.metalData.slice(1)
            })
            .then(data => {
                const totalWeight = Number(data.reduce((weightSum, metalItem) => weightSum + Number(metalItem.metal_weight), 0));
                setNonGoldWeight(totalWeight.toFixed(2));
            })
        inventoryService.getGoldBalance()
            .then(data => {
                setGoldBalance(data);
            })
        inventoryService.getWeightPriceMeta()
            .then(data => {
                setWeightClassPrices(data);
            })
    }, [])

    useEffect(() => {
        if (!display) {
            inventoryService.getWeightPriceMeta()
                .then(data => {
                    setWeightClassPrices(data);
                })
        }
    }, [display])

    const displayPriceUpdater = (e) => {
        setDisplay(true);
        const weightPrice = e.target.dataset.value.split(', ')
        setWeightAndPrice({ weight: weightPrice[0], price: weightPrice[1] });
    }

    return (
        <div className="container-fluid">
            <div className="mx-auto border border-3 rounded mt-3 mb-3" style={{backgroundColor:"#D3C074"}}>
                <div className="col mx-2 mt-2 mb-2">
                    <div className="row">
                        <div className="col">
                            <button className="btn" style={{backgroundColor:"grey", color:"white"}} onClick={() => returnClickHandle('Dashboard')}>Back</button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <h3>Gold Items</h3>
                                </div>
                                <div className="col" style={{ textAlignLast: 'end' }}>
                                    <h3>Total Pure Weight: {goldBalance}</h3>
                                </div>
                            </div>
                            <table className="table table-striped table-hover table-bordered text-center">
                                <thead className="table-warning">
                                    <tr>
                                        <th scope="col">Category</th>
                                        <th scope="col">Subcategory</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        inventoryData.map((inventoryItem, index) => (
                                            <tr key={index}>
                                                <td>{inventoryItem.category}</td>
                                                <td>{inventoryItem.subcategory}</td>
                                                <td>{inventoryItem.quantity}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <h3>Non-Gold Items</h3>
                                </div>
                                <div className="col" style={{ textAlignLast: 'end' }}>
                                    <h3>Total Non-Gold Weight: {nonGoldWeight}</h3>
                                </div>
                            </div>
                            <table className="table table-striped table-hover table-bordered text-center">
                                <thead className="table-warning">
                                    <tr>
                                        <th scope="col">Type</th>
                                        <th scope="col">Weight</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        metalData.map((metalItem, index) => (
                                            <tr key={index}>
                                                <td>{metalItem.metal_type}</td>
                                                <td>{metalItem.metal_weight}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="col">
                                    <h3>Weight Classes to Prices</h3>
                                </div>
                                {
                                    display && 
                                        <div className="col">
                                            <WeightClassPriceUpdater currentPrice={weightAndPrice.price} currentWeightClass={weightAndPrice.weight} handleDisplay={setDisplay} />
                                        </div>
                                }
                            </div>
                            <table className="table table-striped table-hover table-bordered text-center">
                                <thead className="table-warning">
                                    <tr>
                                        <th scope="col">Weight Class</th>
                                        <th scope="col">Weight in Gold</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        weightClassPrices.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.weight_class}</td>
                                                <td>{item.gold_weight}</td>
                                                <td data-value={`${item.weight_class}, ${item.price}`} style={{cursor: 'pointer'}} onClick={(e) => displayPriceUpdater(e)}>{item.price}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Inventory;