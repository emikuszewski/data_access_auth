import React, { useState } from 'react';
import { AlertCircle, Database, Key, Lock, User, FileText, ChevronDown, LogOut, Settings, Shield, Eye, EyeOff, Search, FileSearch, Activity } from 'lucide-react';

const DataAccessAuthDemo = () => {
  const [currentUser, setCurrentUser] = useState({ 
    name: 'Dr. Michael Chen', 
    role: 'Physician', 
    department: 'Cardiology',
    avatar: '👨‍⚕️' 
  });
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState('results');
  const [showQueryBuilder, setShowQueryBuilder] = useState(false);
  const [queryResults, setQueryResults] = useState(true);
  
  // Query Builder state
  const [selectedTable, setSelectedTable] = useState('patient_records');
  const [selectedField, setSelectedField] = useState('department');
  const [selectedValue, setSelectedValue] = useState('Cardiology');
  
  // Executed query state
  const [executedQuery, setExecutedQuery] = useState({
    table: 'patient_records',
    field: 'department',
    value: 'Cardiology'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(true);

  const handleUserChange = (user) => {
    setCurrentUser(user);
    setShowLogin(false);
  };
  
  // Execute query function
  const executeQuery = () => {
    setIsLoading(true);
    // Simulate query execution delay
    setTimeout(() => {
      setExecutedQuery({
        table: selectedTable,
        field: selectedField,
        value: selectedValue
      });
      setHasExecuted(true);
      setIsLoading(false);
      // Switch to results tab automatically
      setActiveTab('results');
    }, 500);
  };
  
  const users = [
    { name: 'Dr. Michael Chen', role: 'Physician', department: 'Cardiology', avatar: '👨‍⚕️' },
    { name: 'Nurse Jennifer Smith', role: 'Nurse', department: 'Cardiology', avatar: '👩‍⚕️' },
    { name: 'Sarah Williams', role: 'Billing Staff', department: 'Finance', avatar: '💰' },
    { name: 'Alex Johnson', role: 'Administrator', department: 'IT Security', avatar: '👨‍💼' }
  ];
  
  // Sample data for different queries
  const allPatientRecords = [
    { patient_id: 'P-10234', name: 'John Smith', ssn: '123-45-6789', diagnosis: 'Hypertension, Stage 2', medications: 'Lisinopril 10mg daily', billing_amount: '$1,250.00', department: 'Cardiology', status: 'Active' },
    { patient_id: 'P-10235', name: 'Mary Johnson', ssn: '234-56-7890', diagnosis: 'Atrial Fibrillation', medications: 'Eliquis 5mg twice daily', billing_amount: '$2,300.50', department: 'Cardiology', status: 'Active' },
    { patient_id: 'P-10236', name: 'Robert Davis', ssn: '345-67-8901', diagnosis: 'Heart Failure (EF 35%)', medications: 'Entresto 97/103mg twice daily', billing_amount: '$3,450.75', department: 'Cardiology', status: 'Active' },
    { patient_id: 'P-10237', name: 'Lisa Chen', ssn: '456-78-9012', diagnosis: 'Lung Cancer, Stage IIIA', medications: 'Keytruda 200mg IV q3 weeks', billing_amount: '$15,250.00', department: 'Oncology', status: 'Active' },
    { patient_id: 'P-10238', name: 'James Wilson', ssn: '567-89-0123', diagnosis: 'Breast Cancer, Stage II', medications: 'Tamoxifen 20mg daily', billing_amount: '$8,500.00', department: 'Oncology', status: 'Active' },
    { patient_id: 'P-10239', name: 'Patricia Brown', ssn: '678-90-1234', diagnosis: 'Migraine, Chronic', medications: 'Aimovig 140mg monthly', billing_amount: '$650.00', department: 'Neurology', status: 'Active' },
    { patient_id: 'P-10240', name: 'Michael Torres', ssn: '789-01-2345', diagnosis: 'Epilepsy', medications: 'Keppra 1000mg twice daily', billing_amount: '$1,100.00', department: 'Neurology', status: 'Discharged' },
    { patient_id: 'P-10241', name: 'Jennifer Lee', ssn: '890-12-3456', diagnosis: 'Asthma, Moderate', medications: 'Advair 250/50 twice daily', billing_amount: '$450.00', department: 'Pediatrics', status: 'Active' },
    { patient_id: 'P-10242', name: 'David Martinez', ssn: '901-23-4567', diagnosis: 'Type 1 Diabetes', medications: 'Insulin Glargine 20 units daily', billing_amount: '$890.00', department: 'Pediatrics', status: 'Active' },
    { patient_id: 'P-10243', name: 'Susan Anderson', ssn: '012-34-5678', diagnosis: 'COVID-19, Severe', medications: 'Remdesivir 100mg IV daily', billing_amount: '$3,100.00', department: 'Emergency', status: 'Critical' }
  ];

  const allMedications = [
    { patient_id: 'P-10234', medication_name: 'Lisinopril', medication_type: 'Oral', dosage: '10mg daily', prescriber: 'Dr. Chen', department: 'Cardiology' },
    { patient_id: 'P-10235', medication_name: 'Eliquis', medication_type: 'Oral', dosage: '5mg twice daily', prescriber: 'Dr. Chen', department: 'Cardiology' },
    { patient_id: 'P-10237', medication_name: 'Keytruda', medication_type: 'IV', dosage: '200mg q3 weeks', prescriber: 'Dr. Patel', department: 'Oncology' },
    { patient_id: 'P-10238', medication_name: 'Tamoxifen', medication_type: 'Oral', dosage: '20mg daily', prescriber: 'Dr. Patel', department: 'Oncology' },
    { patient_id: 'P-10239', medication_name: 'Aimovig', medication_type: 'Injection', dosage: '140mg monthly', prescriber: 'Dr. Kim', department: 'Neurology' },
    { patient_id: 'P-10240', medication_name: 'Keppra', medication_type: 'Oral', dosage: '1000mg twice daily', prescriber: 'Dr. Kim', department: 'Neurology' },
    { patient_id: 'P-10243', medication_name: 'Remdesivir', medication_type: 'IV', dosage: '100mg daily', prescriber: 'Dr. Garcia', department: 'Emergency' }
  ];

  const allBilling = [
    { patient_id: 'P-10234', amount: '$1,250.00', billing_status: 'Paid', insurance: 'Blue Cross', department: 'Cardiology', billing_date: '2025-05-15' },
    { patient_id: 'P-10235', amount: '$2,300.50', billing_status: 'Pending', insurance: 'Aetna', department: 'Cardiology', billing_date: '2025-05-20' },
    { patient_id: 'P-10236', amount: '$3,450.75', billing_status: 'Overdue', insurance: 'United Health', department: 'Cardiology', billing_date: '2025-04-10' },
    { patient_id: 'P-10237', amount: '$15,250.00', billing_status: 'Processing', insurance: 'Medicare', department: 'Oncology', billing_date: '2025-05-25' },
    { patient_id: 'P-10238', amount: '$8,500.00', billing_status: 'Paid', insurance: 'Cigna', department: 'Oncology', billing_date: '2025-05-01' },
    { patient_id: 'P-10239', amount: '$650.00', billing_status: 'Paid', insurance: 'Blue Cross', department: 'Neurology', billing_date: '2025-05-18' },
    { patient_id: 'P-10240', amount: '$1,100.00', billing_status: 'Pending', insurance: 'Aetna', department: 'Neurology', billing_date: '2025-05-22' },
    { patient_id: 'P-10243', amount: '$3,100.00', billing_status: 'Processing', insurance: 'Medicare', department: 'Emergency', billing_date: '2025-05-28' }
  ];

  // Generate SQL query based on selections
  const generateQuery = () => {
    return `SELECT * FROM ${selectedTable} WHERE ${selectedField} = '${selectedValue}';`;
  };
  
  // Get available values based on selected field
  const getFieldValues = (field = selectedField, table = selectedTable) => {
    // For table-specific fields
    if (table === 'medications') {
      switch(field) {
        case 'patient_id':
          return ['P-10234', 'P-10235', 'P-10237', 'P-10238', 'P-10240'];
        case 'medication_type':
          return ['Oral', 'IV', 'Injection', 'Topical'];
        case 'department':
          return ['Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 'Emergency'];
        default:
          return ['Oral', 'IV', 'Injection'];
      }
    } else if (table === 'billing') {
      switch(field) {
        case 'patient_id':
          return ['P-10234', 'P-10235', 'P-10236', 'P-10237', 'P-10238'];
        case 'department':
          return ['Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 'Emergency'];
        case 'billing_status':
          return ['Paid', 'Pending', 'Overdue', 'Processing'];
        default:
          return ['Paid', 'Pending', 'Overdue'];
      }
    } else {
      // patient_records table
      switch(field) {
        case 'department':
          return ['Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 'Emergency'];
        case 'patient_id':
          return ['P-10234', 'P-10235', 'P-10236', 'P-10237', 'P-10238'];
        case 'diagnosis':
          return ['Hypertension', 'Diabetes', 'Heart Failure', 'Asthma', 'COVID-19'];
        case 'status':
          return ['Active', 'Discharged', 'Pending', 'Critical'];
        default:
          return ['Cardiology', 'Oncology', 'Neurology'];
      }
    }
  };
  
  // Get available fields based on selected table
  const getTableFields = (table = selectedTable) => {
    switch(table) {
      case 'patient_records':
        return ['department', 'patient_id', 'diagnosis', 'status'];
      case 'medications':
        return ['patient_id', 'medication_type', 'department'];
      case 'billing':
        return ['patient_id', 'department', 'billing_status'];
      default:
        return ['department', 'patient_id', 'diagnosis'];
    }
  };

  // Filter data based on query
  const getFilteredData = () => {
    let data = [];
    
    switch(executedQuery.table) {
      case 'patient_records':
        data = allPatientRecords.filter(record => {
          if (executedQuery.field === 'diagnosis') {
            // For diagnosis, do a partial match
            return record.diagnosis.toLowerCase().includes(executedQuery.value.toLowerCase());
          }
          return record[executedQuery.field] === executedQuery.value;
        });
        break;
      case 'medications':
        data = allMedications.filter(med => med[executedQuery.field] === executedQuery.value);
        // Join with patient data to get names
        data = data.map(med => {
          const patient = allPatientRecords.find(p => p.patient_id === med.patient_id);
          return { ...med, patient_name: patient?.name || 'Unknown' };
        });
        break;
      case 'billing':
        data = allBilling.filter(bill => bill[executedQuery.field] === executedQuery.value);
        // Join with patient data to get names
        data = data.map(bill => {
          const patient = allPatientRecords.find(p => p.patient_id === bill.patient_id);
          return { ...bill, patient_name: patient?.name || 'Unknown' };
        });
        break;
    }
    
    return data;
  };
  
  const renderPatientData = () => {
    if (!queryResults) return null;
    
    if (isLoading) {
      return (
        <div className="text-center py-8 text-gray-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
          <p>Executing query...</p>
        </div>
      );
    }
    
    if (!hasExecuted) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Database className="h-12 w-12 mx-auto mb-2 text-gray-400" />
          <p>Build a query and click Execute to see results.</p>
        </div>
      );
    }
    
    const filteredData = getFilteredData();
    
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 p-3 rounded border border-blue-200">
          <p className="text-sm text-gray-600">Showing results for:</p>
          <code className="text-sm font-mono text-blue-700">
            SELECT * FROM {executedQuery.table} WHERE {executedQuery.field} = '{executedQuery.value}'
          </code>
        </div>
        
        {filteredData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            <p>No records found matching your query.</p>
          </div>
        ) : (
          executedQuery.table === 'medications' ? renderMedicationsTable(filteredData) :
          executedQuery.table === 'billing' ? renderBillingTable(filteredData) :
          renderPatientRecordsTable(filteredData)
        )}
      </div>
    );
  };

  const renderPatientRecordsTable = (data) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">SSN</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Medications</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Billing</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((record, index) => (
              <tr key={record.patient_id} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                <td className="p-3 whitespace-nowrap">{record.patient_id}</td>
                <td className="p-3 whitespace-nowrap font-medium">
                  {currentUser.role === 'Physician' || currentUser.role === 'Nurse' 
                    ? record.name 
                    : record.name.split(' ')[0] + ' ' + record.name.split(' ')[1][0] + '.'}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Physician' 
                    ? record.ssn 
                    : currentUser.role === 'Billing Staff' 
                    ? 'XXX-XX-' + record.ssn.slice(-4)
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Physician' 
                    ? record.diagnosis 
                    : currentUser.role === 'Nurse'
                    ? record.diagnosis.split(',')[0]
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Physician' || currentUser.role === 'Nurse'
                    ? record.medications
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Physician' || currentUser.role === 'Billing Staff' || currentUser.role === 'Administrator'
                    ? record.billing_amount
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderMedicationsTable = (data) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Medication</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Prescriber</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((med, index) => (
              <tr key={`${med.patient_id}-${index}`} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                <td className="p-3 whitespace-nowrap">{med.patient_id}</td>
                <td className="p-3 whitespace-nowrap font-medium">
                  {currentUser.role === 'Physician' || currentUser.role === 'Nurse' 
                    ? med.patient_name 
                    : currentUser.role === 'Billing Staff' || currentUser.role === 'Administrator'
                    ? med.patient_name.split(' ')[0] + ' ' + med.patient_name.split(' ')[1][0] + '.'
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Physician' || currentUser.role === 'Nurse'
                    ? med.medication_name
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Physician' || currentUser.role === 'Nurse'
                    ? med.medication_type
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Physician' || currentUser.role === 'Nurse'
                    ? med.dosage
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Physician' || currentUser.role === 'Nurse'
                    ? med.prescriber
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderBillingTable = (data) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Insurance</th>
              <th className="p-3 text-left font-medium text-gray-500 uppercase tracking-wider">Billing Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((bill, index) => (
              <tr key={`${bill.patient_id}-${index}`} className={index % 2 === 1 ? 'bg-gray-50' : ''}>
                <td className="p-3 whitespace-nowrap">{bill.patient_id}</td>
                <td className="p-3 whitespace-nowrap font-medium">
                  {currentUser.role === 'Physician' || currentUser.role === 'Nurse' 
                    ? bill.patient_name 
                    : bill.patient_name.split(' ')[0] + ' ' + bill.patient_name.split(' ')[1][0] + '.'}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Billing Staff' || currentUser.role === 'Administrator' || currentUser.role === 'Physician'
                    ? bill.amount
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bill.billing_status === 'Paid' ? 'bg-green-100 text-green-800' :
                    bill.billing_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    bill.billing_status === 'Overdue' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {currentUser.role === 'Billing Staff' || currentUser.role === 'Administrator' || currentUser.role === 'Physician'
                      ? bill.billing_status
                      : 'MASKED'}
                  </span>
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Billing Staff' || currentUser.role === 'Administrator'
                    ? bill.insurance
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
                <td className="p-3 whitespace-nowrap">
                  {currentUser.role === 'Billing Staff' || currentUser.role === 'Administrator'
                    ? bill.billing_date
                    : <span className="text-gray-400 italic">MASKED</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderQueryTransformation = () => {
    const currentQuery = hasExecuted 
      ? `SELECT * FROM ${executedQuery.table} WHERE ${executedQuery.field} = '${executedQuery.value}';`
      : generateQuery();
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Original Query:</h3>
          <div className="bg-gray-50 p-3 rounded border">
            <code className="text-sm font-mono">{currentQuery}</code>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Modified Query for {currentUser.role}:</h3>
          <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
            <code className="text-sm font-mono whitespace-pre-wrap">
              {currentUser.role === 'Physician' ? 
                `SELECT
  patient_id,
  name,
  ssn,
  diagnosis,
  medications,
  billing_amount
FROM ${hasExecuted ? executedQuery.table : selectedTable} 
WHERE ${hasExecuted ? executedQuery.field : selectedField} = '${hasExecuted ? executedQuery.value : selectedValue}';` 
                : currentUser.role === 'Billing Staff' ?
                `SELECT
  patient_id,
  SUBSTR(name, 1, INSTR(name, ' ') + 1) AS name,
  CONCAT('XXX-XX-', SUBSTR(ssn, 8, 4)) AS ssn,
  'MASKED' AS diagnosis,
  'MASKED' AS medications,
  billing_amount
FROM ${hasExecuted ? executedQuery.table : selectedTable} 
WHERE ${hasExecuted ? executedQuery.field : selectedField} = '${hasExecuted ? executedQuery.value : selectedValue}';`
                : currentUser.role === 'Nurse' ?
                `SELECT
  patient_id,
  name,
  'MASKED' AS ssn,
  SUBSTR(diagnosis, 1, INSTR(diagnosis, ',')) AS diagnosis,
  medications,
  'MASKED' AS billing_amount
FROM ${hasExecuted ? executedQuery.table : selectedTable} 
WHERE ${hasExecuted ? executedQuery.field : selectedField} = '${hasExecuted ? executedQuery.value : selectedValue}';`
                :
                `SELECT
  patient_id,
  SUBSTR(name, 1, INSTR(name, ' ') + 1) AS name,
  'MASKED' AS ssn,
  'MASKED' AS diagnosis,
  'MASKED' AS medications,
  billing_amount
FROM ${hasExecuted ? executedQuery.table : selectedTable} 
WHERE ${hasExecuted ? executedQuery.field : selectedField} = '${hasExecuted ? executedQuery.value : selectedValue}';`
              }
            </code>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded border border-blue-200">
          <h3 className="font-semibold text-gray-700 mb-2">Data Access Auth Transformation Explanation:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>
              Applied <span className="font-semibold">Policy Based Access Control</span> for role: <span className="font-mono bg-blue-100 px-1 rounded">{currentUser.role}</span>
            </li>
            <li>
              <span className="font-semibold">Note:</span> Current policies enforce data masking and access controls. Department affiliation (e.g., Dr. Chen in Cardiology) is not included in the current policy set. Production implementations would typically include department-based policies as an additional access control layer.
            </li>
            {currentUser.role === 'Billing Staff' && (
              <>
                <li>Column Masking: Full name reduced to first name + initial</li>
                <li>Column Masking: SSN shows only last 4 digits</li>
                <li>Column Masking: Clinical data (diagnosis, medications) completely masked</li>
                <li>Full Access: Patient ID and billing information (per role permissions)</li>
              </>
            )}
            {currentUser.role === 'Nurse' && (
              <>
                <li>Column Masking: SSN completely masked</li>
                <li>Column Masking: Showing only primary diagnosis (truncated at first comma)</li>
                <li>Full Access: Medications data for patient care</li>
                <li>Column Masking: Financial information completely masked</li>
              </>
            )}
            {currentUser.role === 'Administrator' && (
              <>
                <li>Column Masking: Full name reduced to first name + initial</li>
                <li>Column Masking: Personal and clinical data completely masked</li>
                <li>Full Access: Patient ID and billing information for reporting</li>
                <li>Row-level security: Limited to current fiscal quarter data only</li>
              </>
            )}
          </ul>
        </div>
        
        <div className="bg-gray-50 p-4 rounded border">
          <h3 className="font-semibold text-gray-700 mb-2">Policy Information:</h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Policies applied: {currentUser.role === 'Physician' ? '3' : currentUser.role === 'Billing Staff' ? '4' : '5'}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 mt-1">
            <Key className="h-4 w-4 text-blue-500" />
            <span>Compliance frameworks: HIPAA, GDPR, Organization Policy</span>
          </div>
        </div>
      </div>
    )
  };

  const renderPolicyDetails = () => {
    return (
      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-500" />
            Policy Based Access Policies
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left font-medium text-gray-500 text-sm">Role</th>
                  <th className="p-2 text-left font-medium text-gray-500 text-sm">Patient ID</th>
                  <th className="p-2 text-left font-medium text-gray-500 text-sm">Name</th>
                  <th className="p-2 text-left font-medium text-gray-500 text-sm">SSN</th>
                  <th className="p-2 text-left font-medium text-gray-500 text-sm">Diagnosis</th>
                  <th className="p-2 text-left font-medium text-gray-500 text-sm">Medications</th>
                  <th className="p-2 text-left font-medium text-gray-500 text-sm">Billing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className={currentUser.role === 'Physician' ? 'bg-blue-50' : ''}>
                  <td className="p-2 whitespace-nowrap">Physician</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                </tr>
                <tr className={currentUser.role === 'Nurse' ? 'bg-blue-50' : ''}>
                  <td className="p-2 whitespace-nowrap">Nurse</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-red-500">None</td>
                  <td className="p-2 whitespace-nowrap text-yellow-500">Partial</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-red-500">None</td>
                </tr>
                <tr className={currentUser.role === 'Billing Staff' ? 'bg-blue-50' : ''}>
                  <td className="p-2 whitespace-nowrap">Billing Staff</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-yellow-500">Partial</td>
                  <td className="p-2 whitespace-nowrap text-yellow-500">Partial</td>
                  <td className="p-2 whitespace-nowrap text-red-500">None</td>
                  <td className="p-2 whitespace-nowrap text-red-500">None</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                </tr>
                <tr className={currentUser.role === 'Administrator' ? 'bg-blue-50' : ''}>
                  <td className="p-2 whitespace-nowrap">Administrator</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-yellow-500">Partial</td>
                  <td className="p-2 whitespace-nowrap text-red-500">None</td>
                  <td className="p-2 whitespace-nowrap text-red-500">None</td>
                  <td className="p-2 whitespace-nowrap text-red-500">None</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 flex items-start space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
              <span>Full</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
              <span>Partial</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
              <span>None</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
            <Key className="h-5 w-5 mr-2 text-purple-500" />
            Current Active Policies
          </h3>
          
          <div className="space-y-2 mt-3">
            {currentUser.role === 'Physician' && (
              <>
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">HIPAA Minimum Necessary</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Limits Protected Health Information (PHI) access to minimum necessary for job function</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Clinical Data Full Access</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Unrestricted access to diagnoses, medications, and treatment information</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Patient Identity Access</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Full access to patient names and identifiers for clinical care</div>
                </div>
              </>
            )}
            
            {currentUser.role === 'Billing Staff' && (
              <>
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">HIPAA Minimum Necessary</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Limits Protected Health Information (PHI) access to minimum necessary for job function</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Financial Data Full Access</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Complete access to billing amounts and financial records</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">SSN Partial Access</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Last 4 digits visible for identity verification in billing</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Clinical Data Restriction</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Blocks access to all medical diagnoses and treatment data</div>
                </div>
              </>
            )}
            
            {currentUser.role === 'Nurse' && (
              <>
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">HIPAA Minimum Necessary</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Limits Protected Health Information (PHI) access to minimum necessary for job function</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Clinical Care Access</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Access to diagnoses and medications for patient care</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">SSN Full Protection</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Complete masking of Social Security Numbers</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Financial Data Restriction</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Blocks access to all billing and financial information</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Patient Identity Access</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Full access to patient names for care coordination</div>
                </div>
              </>
            )}
            
            {currentUser.role === 'Administrator' && (
              <>
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">HIPAA Minimum Necessary</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Limits Protected Health Information (PHI) access to minimum necessary for job function</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Aggregate Financial Access</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Access to billing data for reporting and analysis</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">PII Masking Policy</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Partial masking of names and complete SSN protection</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Clinical Data Restriction</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Blocks access to all medical diagnoses and treatment data</div>
                </div>
                
                <div className="border rounded p-2 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Audit Trail Access</div>
                    <div className="text-green-500 text-sm font-medium">Active</div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Access to system logs and data access patterns for compliance</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  };

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'results':
        return renderPatientData();
      case 'transformation':
        return renderQueryTransformation();
      case 'policy':
        return renderPolicyDetails();
      default:
        return renderPatientData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Data Access Auth Healthcare Demo</h1>
              <p className="text-blue-100 text-sm">Dynamic Authorization for Healthcare Data</p>
            </div>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowLogin(!showLogin)}
              className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
            >
              <div className="text-2xl">{currentUser.avatar}</div>
              <div className="text-left">
                <div className="font-medium">{currentUser.name}</div>
                <div className="text-xs text-blue-200">{currentUser.role} • {currentUser.department}</div>
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showLogin && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                <div className="p-2 border-b">
                  <p className="text-gray-500 text-sm">Switch User</p>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {users.map((user, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-3"
                      onClick={() => handleUserChange(user)}
                    >
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.role} • {user.department}</div>
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
                <Database className="h-5 w-5 mr-2 text-blue-500" />
                Database Query
              </h2>
              <button 
                onClick={() => setShowQueryBuilder(!showQueryBuilder)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                {showQueryBuilder ? 'Simple Query' : 'Query Builder'} 
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="p-4">
              {showQueryBuilder ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Table</label>
                      <select 
                        className="w-full border rounded p-2"
                        value={selectedTable}
                        onChange={(e) => {
                          const newTable = e.target.value;
                          setSelectedTable(newTable);
                          // Reset field and value when table changes
                          const newFields = getTableFields(newTable);
                          const newField = newFields[0];
                          setSelectedField(newField);
                          const newValues = getFieldValues(newField, newTable);
                          setSelectedValue(newValues[0]);
                        }}
                      >
                        <option value="patient_records">patient_records</option>
                        <option value="medications">medications</option>
                        <option value="billing">billing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Field</label>
                      <select 
                        className="w-full border rounded p-2"
                        value={selectedField}
                        onChange={(e) => {
                          const newField = e.target.value;
                          setSelectedField(newField);
                          // Reset value when field changes
                          const newValues = getFieldValues(newField, selectedTable);
                          setSelectedValue(newValues[0]);
                        }}
                      >
                        {getTableFields().map(field => (
                          <option key={field} value={field}>{field}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                      <select 
                        className="w-full border rounded p-2"
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                      >
                        {getFieldValues().map(value => (
                          <option key={value} value={value}>{value}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="text-sm text-gray-600 mb-1">Generated Query:</p>
                    <code className="text-sm font-mono">{generateQuery()}</code>
                    {(hasExecuted && (
                      executedQuery.table !== selectedTable || 
                      executedQuery.field !== selectedField || 
                      executedQuery.value !== selectedValue
                    )) && (
                      <p className="text-sm text-amber-600 mt-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Query has changed. Click Execute to run the new query.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border rounded-md"
                      value={generateQuery()}
                      readOnly
                    />
                  </div>
                  <button 
                    onClick={executeQuery}
                    disabled={isLoading}
                    className={`ml-4 px-4 py-2 text-white rounded flex items-center ${
                      isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Executing...
                      </>
                    ) : (
                      <>
                        <FileSearch className="h-4 w-4 mr-2" />
                        Execute
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Results Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b">
              <div className="flex">
                <button 
                  className={`px-4 py-3 text-sm font-medium ${activeTab === 'results' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('results')}
                >
                  Query Results
                </button>
                <button 
                  className={`px-4 py-3 text-sm font-medium ${activeTab === 'transformation' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('transformation')}
                >
                  Query Transformation
                </button>
                <button 
                  className={`px-4 py-3 text-sm font-medium ${activeTab === 'policy' ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('policy')}
                >
                  Policy Details
                </button>
              </div>
            </div>
            <div className="p-4">
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-blue-600 text-white py-2 px-6">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>
                User: {currentUser.name} | Role: {currentUser.role}
              </span>
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              <span>
                Policies Applied: {currentUser.role === 'Physician' ? '3' : currentUser.role === 'Billing Staff' ? '4' : '5'}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Activity className="h-4 w-4 mr-1" />
            <span>Dynamic Authorization Status: Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DataAccessAuthDemo;
