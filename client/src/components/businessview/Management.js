import React, { useEffect, useState } from "react";
import managementService from "../../services/management";

const Management = ({ returnClickHandle }) => {
    const [donations, setDonations] = useState([]);
    const [generalExpenses, setGeneralExpenses] = useState([]);
    const [salaries, setSalaries] = useState([]);
    const [inventoryGainLoss, setInventoryGainLoss] = useState([]);
    const [capitalGainLoss, setCapitalGainLoss] = useState([]);

    useEffect(() => {
        managementService.getAllManagementData()
            .then(data => {
                setDonations(data.donationsData);
                setGeneralExpenses(data.generalExpensesData);
                setSalaries(data.salariesData);
                setCapitalGainLoss(data.capitalGainLossData);
                setInventoryGainLoss(data.inventoryGoldGainLossData);
            })
    }, [])

    return (
        <div className="container-fluid">
            <div className="mx-auto border border-3 rounded mt-3 mb-3" style={{backgroundColor:"#D3C074"}}>
                <div className="col mx-2 mt-2 mb-2">
                    <div className="row">
                        <div className="col">
                            <button className="btn" style={{backgroundColor:"grey", color:"white"}} onClick={() => returnClickHandle('Dashboard')}>Back</button>
                        </div>
                    </div>
                    <div className="row">
                        <h3>Donations</h3>
                        <ul class="list-group">
                            {
                                donations.map(donation => (
                                    <li class="list-group-item">{donation.donation_date} | {donation.donation_type} | {donation.cash_amount}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="row">
                        <h3>General Expenses</h3>
                        <ul class="list-group">
                            {
                                generalExpenses.map(generalExpense => (
                                    <li class="list-group-item">{generalExpense.g_expense_date} | {generalExpense.g_expense_purpose} | {generalExpense.cash_amount}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="row">
                        <h3>Salaries</h3>
                        <ul class="list-group">
                            {
                                salaries.map(salary => (
                                    <li class="list-group-item">{salary.salary_date} | {salary.employee_name} | {salary.cash_amount}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="row">
                        <h3>Capital Gain/Loss</h3>
                        <ul class="list-group">
                            {
                                capitalGainLoss.map(capital => (
                                    <li class="list-group-item">{capital.capital_gl_date} | {capital.capital_gl_purpose} | {capital.cash_amount}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="row">
                        <h3>Inventory Gain/Loss</h3>
                        <ul class="list-group">
                            {
                                inventoryGainLoss.map(inventory => (
                                    <li class="list-group-item">{inventory.invengold_gl_date} | {inventory.invengold_gl_type} | {inventory.invengold_gl_subtype} | {inventory.invengold_gl_weight}</li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Management;