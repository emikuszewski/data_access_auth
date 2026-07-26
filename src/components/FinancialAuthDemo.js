import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── REAL DATA FROM SQL DUMP ───────────────────────────────────────────────────

const users = [
  { name: "Sara Jameson", role: "Wealth Manager", department: "Wealth Management", avatar: "💼", email: "sara.jameson@financialcorp.com", accounts: ["20","12","11","8","13","1776","45"], transferLimit: 100, accessType: "direct" },
  { name: "Jim Johnson", role: "Wealth Manager", department: "Wealth Management", avatar: "📊", email: "jim.johnson@financialcorp.com", accounts: ["22","26","29","45","7","1","2"], transferLimit: 50, accessType: "direct" },
  { name: "Bob Sinclair", role: "Wealth Manager", department: "Wealth Management", avatar: "📈", email: "bob.sinclair@financialcorp.com", accounts: ["30","31","32","33","34","35","36"], transferLimit: 100, accessType: "direct" },
  { name: "Tim Taylor", role: "Wealth Manager", department: "Wealth Management", avatar: "💹", email: "tim.taylor@financialcorp.com", accounts: ["40","41","42","43","44","45","46"], transferLimit: 50, accessType: "direct" },
  { name: "Lara Manager", role: "Regional Manager", department: "Management", avatar: "👩‍💼", email: "lara.manager@financialcorp.com", accounts: ["30","31","32","33","34","35","36","50","51","52","53","54","55","60","61","62","63","64","65","66","67"], transferLimit: 200, accessType: "hierarchical", directReports: ["bob.sinclair","joe.montana","sean.omalley"] },
  { name: "Alex Manager", role: "Regional Manager", department: "Management", avatar: "👨‍💼", email: "alex.manager@financialcorp.com", accounts: ["20","12","11","8","13","1776","45","22","26","29","7","1","2","40","41","42","43","44","46"], transferLimit: 200, accessType: "hierarchical", directReports: ["sara.jameson","jim.johnson","tim.taylor"] },
];

// Real account data from SQL dump
const allAccounts = [
  { account_number: "1", balance: -200, firstname: "Amber", lastname: "Duke", age: 32, gender: "M", address: "880 Holmes Lane", employer: "Pyrami", email: "amberduke@pyrami.com", city: "Brogan", state: "CA", country: "Bhutan" },
  { account_number: "2", balance: 0, firstname: "Roberta", lastname: "Bender", age: 22, gender: "F", address: "560 Kingsway Place", employer: "Chillium", email: "robertabender@chillium.com", city: "Bennett", state: "CA", country: "Belize" },
  { account_number: "7", balance: 39121, firstname: "Levy", lastname: "Richard", age: 22, gender: "M", address: "820 Logan Street", employer: "Teraprene", email: "levyrichard@teraprene.com", city: "Shrewsbury", state: "MO", country: "Albania" },
  { account_number: "8", balance: 48868, firstname: "Jan", lastname: "Burns", age: 35, gender: "M", address: "699 Visitation Place", employer: "Glasstep", email: "janburns@glasstep.com", city: "Wakulla", state: "AZ", country: "Bahrain" },
  { account_number: "11", balance: 20203, firstname: "Jenkins", lastname: "Haney", age: 20, gender: "M", address: "740 Ferry Place", employer: "Qimonk", email: "jenkinshaney@qimonk.com", city: "Steinhatchee", state: "GA", country: "Antigua & Deps" },
  { account_number: "12", balance: 37055, firstname: "Stafford", lastname: "Brock", age: 20, gender: "F", address: "296 Wythe Avenue", employer: "Uncorp", email: "staffordbrock@uncorp.com", city: "Bend", state: "AL", country: "Austria" },
  { account_number: "13", balance: 1032838, firstname: "Bill", lastname: "Gates", age: 67, gender: "M", address: "789 Madison Street", employer: "Microsoft", email: "nanettebates@quility.com", city: "Seattle", state: "WA", country: "Barbados" },
  { account_number: "20", balance: 1016418, firstname: "Warren", lastname: "Buffet", age: 75, gender: "M", address: "282 Kings Place", employer: "Berkshire Hathaway", email: "elinorratliff@scentric.com", city: "Omaha", state: "NE", country: "Georgia" },
  { account_number: "22", balance: 40283, firstname: "Barrera", lastname: "Terrell", age: 23, gender: "F", address: "292 Orange Street", employer: "Steelfab", email: "barreraterrell@steelfab.com", city: "Bynum", state: "ME", country: "Barbados" },
  { account_number: "26", balance: 14127, firstname: "Lorraine", lastname: "Mccullough", age: 39, gender: "F", address: "157 Dupont Street", employer: "Zosis", email: "lorrainemccullough@zosis.com", city: "Dennard", state: "NH", country: "Antigua & Deps" },
  { account_number: "29", balance: 27323, firstname: "Leah", lastname: "Santiago", age: 33, gender: "M", address: "193 Schenck Avenue", employer: "Isologix", email: "leahsantiago@isologix.com", city: "Gerton", state: "ND", country: "Bahrain" },
  { account_number: "30", balance: 19087, firstname: "Lamb", lastname: "Townsend", age: 26, gender: "M", address: "169 Lyme Avenue", employer: "Geeknet", email: "lambtownsend@geeknet.com", city: "Epworth", state: "AL", country: "Austria" },
  { account_number: "31", balance: 30443, firstname: "Kristen", lastname: "Santana", age: 22, gender: "F", address: "130 Middagh Street", employer: "Dogspa", email: "kristensantana@dogspa.com", city: "Vale", state: "MA", country: "Bangladesh" },
  { account_number: "32", balance: 48086, firstname: "Dillard", lastname: "Mcpherson", age: 34, gender: "F", address: "702 Quentin Street", employer: "Quailcom", email: "dillardmcpherson@quailcom.com", city: "Veguita", state: "IN", country: "Algeria" },
  { account_number: "33", balance: 35439, firstname: "Savannah", lastname: "Kirby", age: 30, gender: "F", address: "372 Malta Street", employer: "Musanpoly", email: "savannahkirby@musanpoly.com", city: "Muse", state: "AK", country: "Argentina" },
  { account_number: "34", balance: 35379, firstname: "Ellison", lastname: "Kim", age: 30, gender: "F", address: "986 Revere Place", employer: "Signity", email: "ellisonkim@signity.com", city: "Sehili", state: "IL", country: "Belgium" },
  { account_number: "35", balance: 42039, firstname: "Darla", lastname: "Bridges", age: 27, gender: "F", address: "315 Central Avenue", employer: "Xeronk", email: "darlabridges@xeronk.com", city: "Woodlake", state: "RI", country: "Azerbaijan" },
  { account_number: "36", balance: 15902, firstname: "Alexandra", lastname: "Nguyen", age: 39, gender: "F", address: "389 Elizabeth Place", employer: "Bittor", email: "alexandranguyen@bittor.com", city: "Hemlock", state: "KY", country: "Barbados" },
  { account_number: "40", balance: 33882, firstname: "Pace", lastname: "Molina", age: 40, gender: "M", address: "263 Ovington Court", employer: "Cytrak", email: "pacemolina@cytrak.com", city: "Silkworth", state: "OR", country: "Australia" },
  { account_number: "41", balance: 36060, firstname: "Hancock", lastname: "Holden", age: 20, gender: "M", address: "625 Gaylord Drive", employer: "Poochies", email: "hancockholden@poochies.com", city: "Alamo", state: "KS", country: "Benin" },
  { account_number: "42", balance: 21137, firstname: "Harding", lastname: "Hobbs", age: 26, gender: "F", address: "474 Ridgewood Place", employer: "Xth", email: "hardinghobbs@xth.com", city: "Heil", state: "ND", country: "Bahamas" },
  { account_number: "43", balance: 33474, firstname: "Ryan", lastname: "Howe", age: 25, gender: "M", address: "660 Huntington Street", employer: "Microluxe", email: "ryanhowe@microluxe.com", city: "Clara", state: "CT", country: "Belarus" },
  { account_number: "44", balance: 34487, firstname: "Aurelia", lastname: "Harding", age: 37, gender: "M", address: "502 Baycliff Terrace", employer: "Orbalix", email: "aureliaharding@orbalix.com", city: "Yardville", state: "DE", country: "Angola" },
  { account_number: "45", balance: 44478, firstname: "Geneva", lastname: "Morin", age: 21, gender: "F", address: "357 Herkimer Street", employer: "Ezent", email: "genevamorin@ezent.com", city: "Blanco", state: "AZ", country: "Austria" },
  { account_number: "46", balance: 12351, firstname: "Karla", lastname: "Bowman", age: 23, gender: "M", address: "554 Chapel Street", employer: "Undertap", email: "karlabowman@undertap.com", city: "Sylvanite", state: "DC", country: "Bhutan" },
  { account_number: "50", balance: 43695, firstname: "Sheena", lastname: "Kirkland", age: 33, gender: "M", address: "598 Bank Street", employer: "Zerbina", email: "sheenakirkland@zerbina.com", city: "Walland", state: "IN", country: "Belize" },
  { account_number: "51", balance: 14097, firstname: "Burton", lastname: "Meyers", age: 31, gender: "F", address: "334 River Street", employer: "Bezal", email: "burtonmeyers@bezal.com", city: "Jacksonburg", state: "MO", country: "Argentina" },
  { account_number: "52", balance: 46425, firstname: "Kayla", lastname: "Bradshaw", age: 31, gender: "M", address: "449 Barlow Drive", employer: "Magnemo", email: "kaylabradshaw@magnemo.com", city: "Wawona", state: "AZ", country: "Azerbaijan" },
  { account_number: "53", balance: 28101, firstname: "Kathryn", lastname: "Payne", age: 29, gender: "F", address: "467 Louis Place", employer: "Katakana", email: "kathrynpayne@katakana.com", city: "Harviell", state: "SD", country: "Bolivia" },
  { account_number: "54", balance: 23406, firstname: "Angel", lastname: "Mann", age: 22, gender: "F", address: "229 Ferris Street", employer: "Amtas", email: "angelmann@amtas.com", city: "Calverton", state: "WA", country: "Bangladesh" },
  { account_number: "55", balance: 22020, firstname: "Shelia", lastname: "Puckett", age: 33, gender: "M", address: "265 Royce Place", employer: "Izzby", email: "sheliapuckett@izzby.com", city: "Slovan", state: "HI", country: "Benin" },
  { account_number: "60", balance: 45955, firstname: "Maude", lastname: "Casey", age: 31, gender: "F", address: "566 Strauss Street", employer: "Quilch", email: "maudecasey@quilch.com", city: "Enlow", state: "GA", country: "Botswana" },
  { account_number: "61", balance: 6856, firstname: "Shawn", lastname: "Baird", age: 20, gender: "M", address: "605 Monument Walk", employer: "Moltonic", email: "shawnbaird@moltonic.com", city: "Darlington", state: "MN", country: "Belarus" },
  { account_number: "62", balance: 43065, firstname: "Lester", lastname: "Stanton", age: 37, gender: "M", address: "969 Doughty Street", employer: "Geekko", email: "lesterstanton@geekko.com", city: "Itmann", state: "DC", country: "Bhutan" },
  { account_number: "63", balance: 6077, firstname: "Hughes", lastname: "Owens", age: 30, gender: "F", address: "510 Sedgwick Street", employer: "Valpreal", email: "hughesowens@valpreal.com", city: "Guilford", state: "KS", country: "Australia" },
  { account_number: "64", balance: 44036, firstname: "Miles", lastname: "Battle", age: 35, gender: "F", address: "988 Homecrest Avenue", employer: "Koffee", email: "milesbattle@koffee.com", city: "Motley", state: "ID", country: "Bahrain" },
  { account_number: "65", balance: 23282, firstname: "Leonor", lastname: "Pruitt", age: 24, gender: "M", address: "974 Terrace Place", employer: "Velos", email: "leonorpruitt@velos.com", city: "Devon", state: "WI", country: "Brazil" },
  { account_number: "66", balance: 25939, firstname: "Franks", lastname: "Salinas", age: 28, gender: "M", address: "437 Hamilton Walk", employer: "Cowtown", email: "frankssalinas@cowtown.com", city: "Chase", state: "VT", country: "Belgium" },
  { account_number: "67", balance: 39430, firstname: "Isabelle", lastname: "Spence", age: 39, gender: "M", address: "718 Troy Avenue", employer: "Geeketron", email: "isabellespence@geeketron.com", city: "Camptown", state: "WA", country: "Bolivia" },
  { account_number: "1776", balance: 6744, firstname: "demo", lastname: "john", age: 21, gender: "F", address: "612 Duryea Place", employer: "Papricut", email: "demo.john@se-plainid.com", city: "Marenisco", state: "MD", country: "Andorra" },
];

// Real transactions from SQL dump (for assigned accounts only)
const allTransactions = [
  { transaction_id: "924662ff", originating_account_number: "1", action: "transfer", to_account_number: "42-739-4974", stock: null, stock_amount: null, transfer_amount: 63248 },
  { transaction_id: "f6e03325", originating_account_number: "1", action: "sell", to_account_number: null, stock: "VLY.WS", stock_amount: 73863, transfer_amount: null },
  { transaction_id: "459f4071", originating_account_number: "1", action: "buy", to_account_number: null, stock: "CHSCM", stock_amount: 74928, transfer_amount: null },
  { transaction_id: "87ad3d0d", originating_account_number: "1", action: "buy", to_account_number: null, stock: "SEIC", stock_amount: 12839, transfer_amount: null },
  { transaction_id: "0b511c7f", originating_account_number: "1", action: "transfer", to_account_number: "30-878-3421", stock: null, stock_amount: null, transfer_amount: 89611 },
  { transaction_id: "9a4b47f0", originating_account_number: "2", action: "sell", to_account_number: null, stock: "GGM", stock_amount: 15871, transfer_amount: null },
  { transaction_id: "c3923466", originating_account_number: "2", action: "buy", to_account_number: null, stock: "CSX", stock_amount: 40993, transfer_amount: null },
  { transaction_id: "4a8f5e51", originating_account_number: "2", action: "transfer", to_account_number: "17-340-7134", stock: null, stock_amount: null, transfer_amount: 64511 },
  { transaction_id: "0f0e9f84", originating_account_number: "2", action: "transfer", to_account_number: "78-538-0926", stock: null, stock_amount: null, transfer_amount: 19103 },
  { transaction_id: "8b516e67", originating_account_number: "7", action: "transfer", to_account_number: "85-355-9652", stock: null, stock_amount: null, transfer_amount: 59392 },
  { transaction_id: "a913286a", originating_account_number: "7", action: "buy", to_account_number: null, stock: "GWPH", stock_amount: 84933, transfer_amount: null },
  { transaction_id: "ba11b1d6", originating_account_number: "8", action: "buy", to_account_number: null, stock: "GOOS", stock_amount: 41782, transfer_amount: null },
  { transaction_id: "f7f75d34", originating_account_number: "11", action: "transfer", to_account_number: "46-763-4996", stock: null, stock_amount: null, transfer_amount: 27361 },
  { transaction_id: "32e08f20", originating_account_number: "11", action: "buy", to_account_number: null, stock: "ABTL", stock_amount: 7828, transfer_amount: null },
  { transaction_id: "78f32fdf", originating_account_number: "12", action: "sell", to_account_number: null, stock: "ARU.CL", stock_amount: 599, transfer_amount: null },
  { transaction_id: "27e60b5c", originating_account_number: "12", action: "buy", to_account_number: null, stock: "EGT", stock_amount: 9544, transfer_amount: null },
  { transaction_id: "59636ba5", originating_account_number: "12", action: "buy", to_account_number: null, stock: "MPCT", stock_amount: 96882, transfer_amount: null },
  { transaction_id: "20783270", originating_account_number: "12", action: "transfer", to_account_number: "11-109-0213", stock: null, stock_amount: null, transfer_amount: 14990 },
  { transaction_id: "3be576b6", originating_account_number: "13", action: "buy", to_account_number: null, stock: "AFL", stock_amount: 20589, transfer_amount: null },
  { transaction_id: "a1c9abca", originating_account_number: "13", action: "sell", to_account_number: null, stock: "VBFC", stock_amount: 33194, transfer_amount: null },
  { transaction_id: "6f84ad6e", originating_account_number: "13", action: "buy", to_account_number: null, stock: "FNK", stock_amount: 33275, transfer_amount: null },
  { transaction_id: "51bf40c1", originating_account_number: "13", action: "transfer", to_account_number: "10-778-4098", stock: null, stock_amount: null, transfer_amount: 33617 },
  { transaction_id: "2fc9d9ca", originating_account_number: "20", action: "buy", to_account_number: null, stock: "ONB", stock_amount: 47882, transfer_amount: null },
  { transaction_id: "94add557", originating_account_number: "20", action: "transfer", to_account_number: "84-871-2384", stock: null, stock_amount: null, transfer_amount: 65886 },
  { transaction_id: "94e71136", originating_account_number: "20", action: "sell", to_account_number: null, stock: "CENX", stock_amount: 98761, transfer_amount: null },
  { transaction_id: "c077d219", originating_account_number: "20", action: "buy", to_account_number: null, stock: "BLFS", stock_amount: 98585, transfer_amount: null },
  { transaction_id: "edef578c", originating_account_number: "20", action: "transfer", to_account_number: "80-430-3403", stock: null, stock_amount: null, transfer_amount: 84633 },
  { transaction_id: "cfdbbf4c", originating_account_number: "20", action: "buy", to_account_number: null, stock: "FNV", stock_amount: 76911, transfer_amount: null },
  { transaction_id: "aeca1109", originating_account_number: "22", action: "sell", to_account_number: null, stock: "ABBV", stock_amount: 83951, transfer_amount: null },
  { transaction_id: "64ed28e5", originating_account_number: "22", action: "buy", to_account_number: null, stock: "FSBK", stock_amount: 39634, transfer_amount: null },
  { transaction_id: "29703d01", originating_account_number: "22", action: "buy", to_account_number: null, stock: "RELX", stock_amount: 41246, transfer_amount: null },
  { transaction_id: "08a1b322", originating_account_number: "26", action: "sell", to_account_number: null, stock: "APOPW", stock_amount: 15010, transfer_amount: null },
  { transaction_id: "bd598116", originating_account_number: "26", action: "buy", to_account_number: null, stock: "HDB", stock_amount: 88668, transfer_amount: null },
  { transaction_id: "0f54baba", originating_account_number: "26", action: "buy", to_account_number: null, stock: "HYZD", stock_amount: 39728, transfer_amount: null },
  { transaction_id: "6d9571dc", originating_account_number: "29", action: "transfer", to_account_number: "88-906-1931", stock: null, stock_amount: null, transfer_amount: 42657 },
  { transaction_id: "69949fed", originating_account_number: "29", action: "sell", to_account_number: null, stock: "MPV", stock_amount: 9235, transfer_amount: null },
  { transaction_id: "a85db842", originating_account_number: "29", action: "sell", to_account_number: null, stock: "NEM", stock_amount: 33430, transfer_amount: null },
  { transaction_id: "92e54546", originating_account_number: "29", action: "sell", to_account_number: null, stock: "ARNC^B", stock_amount: 31411, transfer_amount: null },
  { transaction_id: "b0424253", originating_account_number: "45", action: "sell", to_account_number: null, stock: "SCAC", stock_amount: 8881, transfer_amount: null },
  { transaction_id: "c4d14570", originating_account_number: "45", action: "buy", to_account_number: null, stock: "AB", stock_amount: 92241, transfer_amount: null },
  { transaction_id: "d17d0d46", originating_account_number: "45", action: "transfer", to_account_number: "25-765-7030", stock: null, stock_amount: null, transfer_amount: 57414 },
  { transaction_id: "7665c07a", originating_account_number: "45", action: "sell", to_account_number: null, stock: "WRB^C", stock_amount: 36411, transfer_amount: null },
  { transaction_id: "1776a001", originating_account_number: "1776", action: "buy", to_account_number: null, stock: "CHSCM", stock_amount: 74928, transfer_amount: null },
];

// Column classifications from pgsql_columns table
const columnClassifications = {
  account_number: { classification: "private", label: "Private" },
  balance: { classification: "financial", label: "Financial" },
  firstname: { classification: "public", label: "Public" },
  lastname: { classification: "public", label: "Public" },
  age: { classification: "pii", label: "PII" },
  email: { classification: "confidential", label: "Confidential" },
  address: { classification: "private", label: "Private" },
  employer: { classification: "private", label: "Private" },
  city: { classification: "public", label: "Public" },
  state: { classification: "public", label: "Public" },
};

// ─── MASKING FUNCTIONS (matching PlainID mask_4 / mask_int) ────────────────────
const mask_4 = (str) => {
  if (!str) return "****";
  if (str.length <= 4) return str;
  return "*".repeat(str.length - 4) + str.slice(-4);
};
const mask_int = () => 0;

const applyMasking = (record, user) => {
  // Regional Managers: full visibility — oversight role, no masking
  if (user.role === "Regional Manager") return { ...record };
  // Wealth Managers: employer and address masked (private classification)
  if (user.role === "Wealth Manager") {
    return { ...record, employer: "MASKED", address: "MASKED" };
  }
  return record;
};

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function FinancialAuthDemo() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(users[0]);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState("results");
  const [showQueryBuilder, setShowQueryBuilder] = useState(false);
  const [selectedTable, setSelectedTable] = useState("accounts");
  const [selectedField, setSelectedField] = useState("wealth_manager");
  const [selectedValue, setSelectedValue] = useState("sara.jameson@financialcorp.com");
  const [executedQuery, setExecutedQuery] = useState({ table: "accounts", field: "wealth_manager", value: "sara.jameson@financialcorp.com" });
  const [isLoading, setIsLoading] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(true);

  const handleUserChange = (user) => {
    setCurrentUser(user);
    setShowLogin(false);
    setSelectedValue(user.email);
    setIsLoading(true);
    setTimeout(() => {
      setExecutedQuery({ table: selectedTable, field: "wealth_manager", value: user.email });
      setHasExecuted(true);
      setIsLoading(false);
      setActiveTab("results");
    }, 400);
  };

  const executeQuery = () => {
    setIsLoading(true);
    setTimeout(() => {
      setExecutedQuery({ table: selectedTable, field: selectedField, value: selectedValue });
      setHasExecuted(true);
      setIsLoading(false);
      setActiveTab("results");
    }, 400);
  };

  const getTableFields = () => {
    if (selectedTable === "accounts") return ["wealth_manager", "state", "account_number"];
    return ["wealth_manager", "action", "account_number"];
  };

  const getFieldValues = (field, table) => {
    const f = field || selectedField;
    const t = table || selectedTable;
    if (f === "wealth_manager") return users.map(u => u.email);
    if (t === "accounts") {
      if (f === "state") return [...new Set(allAccounts.map(a => a.state))].sort().slice(0, 8);
      if (f === "account_number") return currentUser.accounts.slice(0, 6);
    }
    if (f === "action") return ["buy", "sell", "transfer"];
    if (f === "account_number") return currentUser.accounts.slice(0, 6);
    return [];
  };

  const generateQuery = () => `SELECT * FROM ${selectedTable} WHERE ${selectedField} = '${selectedValue}';`;

  const getFilteredAccounts = () => {
    return allAccounts
      .filter(a => currentUser.accounts.includes(a.account_number))
      .map(a => applyMasking(a, currentUser));
  };

  const getFilteredTransactions = () => {
    return allTransactions.filter(t => currentUser.accounts.includes(t.originating_account_number));
  };

  // ─── RENDER: Account Results Table ───────────────────────────────────────────
  const renderAccountsTable = (data) => (
    <div style={{ overflowX: "auto" }}>
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {["Acct #", "Balance", "First Name", "Last Name", "Age", "Email", "Employer", "City", "State"].map(h => (
              <th key={h} className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider" style={{ fontSize: 11 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((r, i) => (
            <tr key={r.account_number} className={i % 2 === 1 ? "bg-gray-50" : ""}>
              <td className="p-3 whitespace-nowrap font-mono font-medium">{r.account_number}</td>
              <td className="p-3 whitespace-nowrap font-mono">${typeof r.balance === 'number' ? r.balance.toLocaleString() : r.balance}</td>
              <td className="p-3 whitespace-nowrap font-medium">{r.firstname}</td>
              <td className="p-3 whitespace-nowrap font-medium">{r.lastname}</td>
              <td className="p-3 whitespace-nowrap">
                {r.age === "MASKED" ? <span className="text-gray-400 italic">MASKED</span> : r.age}
              </td>
              <td className="p-3 whitespace-nowrap font-mono text-sm">
                {typeof r.email === 'string' && r.email.includes("*")
                  ? <span className="text-amber-600 font-mono">{r.email}</span>
                  : r.email}
              </td>
              <td className="p-3 whitespace-nowrap">
                {r.employer === "MASKED" ? <span className="text-gray-400 italic">MASKED</span> : r.employer}
              </td>
              <td className="p-3 whitespace-nowrap">{r.city}</td>
              <td className="p-3 whitespace-nowrap">{r.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // ─── RENDER: Transactions Table ──────────────────────────────────────────────
  const renderTransactionsTable = (data) => (
    <div style={{ overflowX: "auto" }}>
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {["Transaction ID", "Account", "Action", "To Account", "Stock", "Stock Amt", "Transfer $"].map(h => (
              <th key={h} className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider" style={{ fontSize: 11 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((t, i) => (
            <tr key={t.transaction_id} className={i % 2 === 1 ? "bg-gray-50" : ""}>
              <td className="p-3 whitespace-nowrap font-mono text-sm">{t.transaction_id}</td>
              <td className="p-3 whitespace-nowrap font-mono font-medium">{t.originating_account_number}</td>
              <td className="p-3 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  t.action === "buy" ? "bg-green-100 text-green-800" :
                  t.action === "sell" ? "bg-red-100 text-red-800" :
                  "bg-blue-100 text-blue-800"
                }`}>{t.action}</span>
              </td>
              <td className="p-3 whitespace-nowrap font-mono text-sm">{t.to_account_number || "—"}</td>
              <td className="p-3 whitespace-nowrap font-medium">{t.stock || "—"}</td>
              <td className="p-3 whitespace-nowrap font-mono">{t.stock_amount ? t.stock_amount.toLocaleString() : "—"}</td>
              <td className="p-3 whitespace-nowrap font-mono">{t.transfer_amount ? `$${t.transfer_amount.toLocaleString()}` : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // ─── RENDER: Results Tab ─────────────────────────────────────────────────────
  const renderResults = () => {
    if (isLoading) return (
      <div className="text-center py-8 text-gray-500">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2" />
        <p>Evaluating PlainID policies...</p>
      </div>
    );
    if (!hasExecuted) return (
      <div className="text-center py-8 text-gray-500">
        <p>Build a query and click Execute to see results.</p>
      </div>
    );
    const acctData = getFilteredAccounts();
    const txnData = getFilteredTransactions();
    const data = selectedTable === "accounts" ? acctData : txnData;
    const totalRecords = selectedTable === "accounts" ? allAccounts.length : allTransactions.length;

    return (
      <div className="space-y-4">
        <div className="bg-blue-50 p-3 rounded border border-blue-200 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Showing <strong className="text-blue-700">{data.length}</strong> of {totalRecords}+ records for:</p>
            <code className="text-sm font-mono text-blue-700">
              SELECT * FROM {selectedTable} — filtered by PlainID PDP
            </code>
          </div>
          <span className={`text-xs px-2 py-1 rounded font-medium ${
            currentUser.role === "Wealth Manager" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
          }`}>
            {currentUser.role === "Wealth Manager" ? "Partial Masking" : "Full Visibility"}
          </span>
        </div>
        {selectedTable === "accounts" ? renderAccountsTable(data) : renderTransactionsTable(data)}
      </div>
    );
  };

  // ─── RENDER: Query Transformation Tab ────────────────────────────────────────
  const renderTransformation = () => {
    const accts = currentUser.accounts.map(a => `'${a}'`).join(", ");
    let modifiedQuery = "";
    if (currentUser.role === "Wealth Manager") {
      modifiedQuery = selectedTable === "accounts"
        ? `SELECT account_number, balance, firstname, lastname,\n       age, email, 'MASKED' AS address, 'MASKED' AS employer,\n       city, state\nFROM accounts\nWHERE account_number IN (\n  SELECT account_number\n  FROM wealth_management_table\n  WHERE wealth_manager_id = '${currentUser.email}'\n);\n-- Resolved: account_number IN (${accts})\n-- Transfer limit: $${currentUser.transferLimit}\n-- Column masking: address, employer (private classification)`
        : `SELECT *\nFROM account_transactions\nWHERE originating_account_number IN (\n  SELECT account_number\n  FROM wealth_management_table\n  WHERE wealth_manager_id = '${currentUser.email}'\n);\n-- Resolved: originating_account_number IN (${accts})`;
    } else {
      modifiedQuery = selectedTable === "accounts"
        ? `SELECT account_number, balance, firstname, lastname,\n       age, email, address, employer, city, state\nFROM accounts\nWHERE account_number IN (\n  SELECT account_number\n  FROM wealth_management_table\n  WHERE wealth_manager_id IN (\n    SELECT report\n    FROM wealth_management_direct_reports_table\n    WHERE manager = '${currentUser.email}'\n  )\n);\n-- PBAC: Policy resolves via direct reports: ${(currentUser.directReports||[]).join(", ")}\n-- Full column visibility — oversight role\n-- Transfer limit: $${currentUser.transferLimit}`
        : `SELECT *\nFROM account_transactions\nWHERE originating_account_number IN (\n  SELECT account_number\n  FROM wealth_management_table\n  WHERE wealth_manager_id IN (\n    SELECT report\n    FROM wealth_management_direct_reports_table\n    WHERE manager = '${currentUser.email}'\n  )\n);`;
    }

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Original Query:</h3>
          <div className="bg-gray-50 p-3 rounded border">
            <code className="text-sm font-mono">SELECT * FROM {selectedTable};</code>
          </div>
        </div>

        <div className="text-center text-blue-500 font-medium text-sm py-1">
          ↓ PlainID PDP Policy Evaluation ↓
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Modified Query for {currentUser.name} ({currentUser.role}):</h3>
          <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
            <code className="text-sm font-mono whitespace-pre-wrap">{modifiedQuery}</code>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded border border-blue-200">
          <h3 className="font-semibold text-gray-700 mb-2">Authorization Transformation Explanation:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
            <li>Applied <span className="font-semibold">Policy Based Access Control</span> for role: <span className="font-mono bg-blue-100 px-1 rounded">{currentUser.role}</span></li>
            {currentUser.role === "Wealth Manager" && (
              <>
                <li><strong>Row-Level Filtering:</strong> {currentUser.accounts.length} accounts via <code>wealth_management_table</code> direct assignment</li>
                <li><strong>Transfer Limit:</strong> ${currentUser.transferLimit} enforced per transaction</li>
                <li><strong>Column Masking — Private:</strong> Employer and address fields masked for individual contributor access</li>
                <li><strong>Column Classification Applied:</strong> public (firstname, lastname, city, state), private (account_number, address, employer), confidential (email), financial (balance), pii (age)</li>
              </>
            )}
            {currentUser.role === "Regional Manager" && (
              <>
                <li><strong>Hierarchical Policy (PBAC):</strong> Policy resolves accounts from {(currentUser.directReports||[]).length} direct reports via <code>wealth_management_direct_reports_table</code></li>
                <li><strong>Full Column Visibility:</strong> All column classifications visible — oversight role, no masking applied</li>
                <li><strong>Elevated Transfer Limit:</strong> Manager-level authority at ${currentUser.transferLimit}</li>
              </>
            )}
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded border">
          <h3 className="font-semibold text-gray-700 mb-2">Column Classification (from pgsql_columns):</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(columnClassifications).map(([col, info]) => {
              const isMaskedForUser = currentUser.role === "Wealth Manager" && ["address", "employer"].includes(col);
              return (
                <span key={col} className={`px-2 py-1 rounded text-xs font-mono border ${
                  isMaskedForUser
                    ? "bg-red-50 border-red-200 text-red-700"
                    : "bg-green-50 border-green-200 text-green-700"
                }`}>
                  {isMaskedForUser ? "🔒 " : "✓ "}{col} <span className="text-gray-400">({info.label})</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ─── RENDER: Policy Details Tab ──────────────────────────────────────────────
  const renderPolicyDetails = () => (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
          <span className="mr-2">🛡️</span> Access Level Matrix
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Role", "Acct #", "Balance", "Name", "Age", "Email", "Address", "Employer", "Location", "Row Filter"].map(h => (
                  <th key={h} className="p-3 text-left font-medium text-gray-500 text-sm whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { role: "Wealth Manager", cells: ["Full", "Full", "Full", "Full", "Full", "None", "None", "Full", "Direct Assignment"] },
                { role: "Regional Manager", cells: ["Full", "Full", "Full", "Full", "Full", "Full", "Full", "Full", "Hierarchical Policy"] },
              ].map(row => (
                <tr key={row.role} className={currentUser.role === row.role ? "bg-blue-50" : ""}>
                  <td className="p-3 whitespace-nowrap font-medium">{row.role}</td>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={`p-3 whitespace-nowrap ${
                      cell === "Full" ? "text-green-500" : cell === "None" ? "text-red-500" : cell === "Partial" ? "text-yellow-500" : "text-gray-600 text-sm"
                    }`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-500 flex items-center space-x-4">
          <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-1" /><span>Full</span></div>
          <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded-full mr-1" /><span>Partial (mask_4)</span></div>
          <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-1" /><span>None (mask_int / hidden)</span></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
          <span className="mr-2">🔑</span> Active Policies for {currentUser.name}
        </h3>
        <div className="space-y-2 mt-3">
          {currentUser.role === "Wealth Manager" ? (
            <>
              <PolicyCard name="Row-Level Filter: Direct Assignment" desc={`Access restricted to ${currentUser.accounts.length} accounts assigned in wealth_management_table`} />
              <PolicyCard name="Transfer Limit Enforcement" desc={`Maximum single transfer: $${currentUser.transferLimit} (enforced via wealth_management_table.transfer_limit)`} />
              <PolicyCard name="Column Masking — Private" desc="Employer and address fields masked — private classification restricted for individual contributor role" />
              <PolicyCard name="SOX Compliance — Audit Trail" desc="All data access and transaction events logged for regulatory compliance" />
              <PolicyCard name="GLBA Data Protection" desc="Gramm-Leach-Bliley Act safeguards applied to customer financial data" />
            </>
          ) : (
            <>
              <PolicyCard name="Hierarchical Policy (PBAC)" desc={`Policy resolves account visibility from direct reports: ${(currentUser.directReports||[]).join(", ")}`} />
              <PolicyCard name="Full Column Visibility" desc="All column classifications (public, private, confidential, financial, pii) visible — oversight/supervisory role" />
              <PolicyCard name="Elevated Transfer Limit" desc={`Manager-level transfer authority: $${currentUser.transferLimit}`} />
              <PolicyCard name="SOX Compliance — Audit Trail" desc="All data access and transaction events logged for regulatory compliance" />
            </>
          )}
        </div>
      </div>
    </div>
  );

  // ─── MAIN RENDER ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded text-sm font-medium"
            >
              ← Back
            </button>
            <span className="text-3xl">🛡️</span>
            <div>
              <h1 className="text-xl font-bold">Data Access AuthZ — Financial Services Demo</h1>
              <p className="text-blue-100 text-sm">PlainID Policy-Based Access Control · Wealth Management</p>
            </div>
          </div>

          <div className="relative">
            <button onClick={() => setShowLogin(!showLogin)}
              className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded">
              <div className="text-2xl">{currentUser.avatar}</div>
              <div className="text-left">
                <div className="font-medium">{currentUser.name}</div>
                <div className="text-xs text-blue-200">{currentUser.role} · {currentUser.department}</div>
              </div>
              <span className="ml-1">▾</span>
            </button>

            {showLogin && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-10">
                <div className="p-2 border-b"><p className="text-gray-500 text-sm">Switch Identity</p></div>
                <div className="max-h-72 overflow-y-auto">
                  {users.map((user, i) => (
                    <button key={i} className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                      onClick={() => handleUserChange(user)}>
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-600">{user.role} · {user.accounts.length} accounts · Transfer limit: ${user.transferLimit}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Query Section */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-700 flex items-center">
                <span className="mr-2">🗄️</span> Database Query
              </h2>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  {["accounts", "account_transactions"].map(t => (
                    <button key={t} onClick={() => { setSelectedTable(t); setSelectedField("wealth_manager"); }}
                      className={`px-3 py-1 text-xs rounded font-medium ${selectedTable === t ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      {t}
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowQueryBuilder(!showQueryBuilder)}
                  className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                  {showQueryBuilder ? "Simple Query" : "Query Builder"} ▾
                </button>
              </div>
            </div>
            <div className="p-4">
              {showQueryBuilder ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Table</label>
                      <select className="w-full border rounded p-2" value={selectedTable}
                        onChange={e => { setSelectedTable(e.target.value); setSelectedField("wealth_manager"); }}>
                        <option value="accounts">accounts</option>
                        <option value="account_transactions">account_transactions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
                      <select className="w-full border rounded p-2" value={selectedField}
                        onChange={e => { setSelectedField(e.target.value); const vals = getFieldValues(e.target.value); setSelectedValue(vals[0] || ""); }}>
                        {getTableFields().map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                      <select className="w-full border rounded p-2" value={selectedValue}
                        onChange={e => setSelectedValue(e.target.value)}>
                        {getFieldValues().map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm text-gray-600 mb-1">Generated Query:</p>
                    <code className="text-sm font-mono">{generateQuery()}</code>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={executeQuery} disabled={isLoading}
                      className={`px-4 py-2 text-white rounded flex items-center ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}>
                      {isLoading ? "Executing..." : "▶ Execute"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <input type="text" className="block w-full pl-3 pr-3 py-2 border rounded-md font-mono text-sm"
                      value={`SELECT * FROM ${selectedTable};`} readOnly />
                  </div>
                  <button onClick={executeQuery} disabled={isLoading}
                    className={`ml-4 px-4 py-2 text-white rounded ${isLoading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}>
                    {isLoading ? "Executing..." : "▶ Execute"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b">
              <div className="flex">
                {[
                  { id: "results", label: "Query Results" },
                  { id: "transformation", label: "Query Transformation" },
                  { id: "policy", label: "Policy Details" },
                ].map(tab => (
                  <button key={tab.id}
                    className={`px-4 py-3 text-sm font-medium ${activeTab === tab.id ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab(tab.id)}>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4">
              {activeTab === "results" ? renderResults() :
               activeTab === "transformation" ? renderTransformation() :
               renderPolicyDetails()}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-2 px-6">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span>👤 Identity: {currentUser.email}</span>
            <span>🛡️ Role: {currentUser.role}</span>
            <span>📊 Accounts: {currentUser.accounts.length} accessible</span>
            <span>💰 Transfer Limit: ${currentUser.transferLimit}</span>
          </div>
          <div className="flex items-center">
            <span>PlainID Authorization: <span className="text-green-300">● Active</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── HELPER COMPONENT ──────────────────────────────────────────────────────────
function PolicyCard({ name, desc }) {
  return (
    <div className="border rounded p-2 bg-gray-50">
      <div className="flex justify-between items-center">
        <div className="font-medium">{name}</div>
        <div className="text-green-500 text-sm font-medium">Active</div>
      </div>
      <div className="text-sm text-gray-500 mt-1">{desc}</div>
    </div>
  );
}
