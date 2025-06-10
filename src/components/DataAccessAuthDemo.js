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

  const handleUserChange = (user) => {
    setCurrentUser(user);
    setShowLogin(false);
  };
  
  const users = [
    { name: 'Dr. Michael Chen', role: 'Physician', department: 'Cardiology', avatar: '👨‍⚕️' },
    { name: 'Nurse Jennifer Smith', role: 'Nurse', department: 'Cardiology', avatar: '👩‍⚕️' },
    { name: 'Sarah Williams', role: 'Billing Staff', department: 'Finance', avatar: '💰' },
    { name: 'Alex Johnson', role: 'Administrator', department: 'IT Security', avatar: '👨‍💼' }
  ];
  
  // Generate SQL query based on selections
  const generateQuery = () => {
    return `SELECT * FROM ${selectedTable} WHERE ${selectedField} = '${selectedValue}';`;
  };
  
  // Get available values based on selected field
  const getFieldValues = () => {
    switch(selectedField) {
      case 'department':
        return ['Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 'Emergency'];
      case 'patient_id':
        return ['P-10234', 'P-10235', 'P-10236', 'P-10237', 'P-10238'];
      case 'diagnosis':
        return ['Hypertension', 'Diabetes', 'Heart Failure', 'Asthma', 'COVID-19'];
      case 'status':
        return ['Active', 'Discharged', 'Pending', 'Critical'];
      case 'medication_type':
        return ['Oral', 'IV', 'Injection', 'Topical'];
      case 'billing_status':
        return ['Paid', 'Pending', 'Overdue', 'Processing'];
      default:
        return ['Cardiology', 'Oncology', 'Neurology'];
    }
  };
  
  // Get available fields based on selected table
  const getTableFields = () => {
    switch(selectedTable) {
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
  
  const renderPatientData = () => {
    if (!queryResults) return null;
    
    // Display different data based on user role
    switch(currentUser.role) {
      case 'Physician':
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
                <tr>
                  <td className="p-3 whitespace-nowrap">P-10234</td>
                  <td className="p-3 whitespace-nowrap font-medium">John Smith</td>
                  <td className="p-3 whitespace-nowrap">123-45-6789</td>
                  <td className="p-3 whitespace-nowrap">Hypertension, Stage 2</td>
                  <td className="p-3 whitespace-nowrap">Lisinopril 10mg daily</td>
                  <td className="p-3 whitespace-nowrap">$1,250.00</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 whitespace-nowrap">P-10235</td>
                  <td className="p-3 whitespace-nowrap font-medium">Mary Johnson</td>
                  <td className="p-3 whitespace-nowrap">234-56-7890</td>
                  <td className="p-3 whitespace-nowrap">Atrial Fibrillation</td>
                  <td className="p-3 whitespace-nowrap">Eliquis 5mg twice daily</td>
                  <td className="p-3 whitespace-nowrap">$2,300.50</td>
                </tr>
                <tr>
                  <td className="p-3 whitespace-nowrap">P-10236</td>
                  <td className="p-3 whitespace-nowrap font-medium">Robert Davis</td>
                  <td className="p-3 whitespace-nowrap">345-67-8901</td>
                  <td className="p-3 whitespace-nowrap">Heart Failure (EF 35%)</td>
                  <td className="p-3 whitespace-nowrap">Entresto 97/103mg twice daily</td>
                  <td className="p-3 whitespace-nowrap">$3,450.75</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'Billing Staff':
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
                <tr>
                  <td className="p-3 whitespace-nowrap">P-10234</td>
                  <td className="p-3 whitespace-nowrap font-medium">John S.</td>
                  <td className="p-3 whitespace-nowrap">XXX-XX-6789</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap">$1,250.00</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 whitespace-nowrap">P-10235</td>
                  <td className="p-3 whitespace-nowrap font-medium">Mary J.</td>
                  <td className="p-3 whitespace-nowrap">XXX-XX-7890</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap">$2,300.50</td>
                </tr>
                <tr>
                  <td className="p-3 whitespace-nowrap">P-10236</td>
                  <td className="p-3 whitespace-nowrap font-medium">Robert D.</td>
                  <td className="p-3 whitespace-nowrap">XXX-XX-8901</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap">$3,450.75</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 'Nurse':
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
                <tr>
                  <td className="p-3 whitespace-nowrap">P-10234</td>
                  <td className="p-3 whitespace-nowrap font-medium">John Smith</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap">Hypertension</td>
                  <td className="p-3 whitespace-nowrap">Lisinopril 10mg daily</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 whitespace-nowrap">P-10235</td>
                  <td className="p-3 whitespace-nowrap font-medium">Mary Johnson</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap">Atrial Fibrillation</td>
                  <td className="p-3 whitespace-nowrap">Eliquis 5mg twice daily</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                </tr>
                <tr>
                  <td className="p-3 whitespace-nowrap">P-10236</td>
                  <td className="p-3 whitespace-nowrap font-medium">Robert Davis</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap">Heart Failure</td>
                  <td className="p-3 whitespace-nowrap">Entresto 97/103mg twice daily</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
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
                <tr>
                  <td className="p-3 whitespace-nowrap">P-10234</td>
                  <td className="p-3 whitespace-nowrap font-medium">John S.</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap">$1,250.00</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-3 whitespace-nowrap">P-10235</td>
                  <td className="p-3 whitespace-nowrap font-medium">Mary J.</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap">$2,300.50</td>
                </tr>
                <tr>
                  <td className="p-3 whitespace-nowrap">P-10236</td>
                  <td className="p-3 whitespace-nowrap font-medium">Robert D.</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap text-gray-400 italic">MASKED</td>
                  <td className="p-3 whitespace-nowrap">$3,450.75</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
    }
  };

  const renderQueryTransformation = () => {
    const currentQuery = generateQuery();
    
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
FROM ${selectedTable} 
WHERE ${selectedField} = '${selectedValue}';` 
                : currentUser.role === 'Billing Staff' ?
                `SELECT
  patient_id,
  SUBSTR(name, 1, INSTR(name, ' ') + 1) AS name,
  CONCAT('XXX-XX-', SUBSTR(ssn, 8, 4)) AS ssn,
  'MASKED' AS diagnosis,
  'MASKED' AS medications,
  billing_amount
FROM ${selectedTable} 
WHERE ${selectedField} = '${selectedValue}';`
                : currentUser.role === 'Nurse' ?
                `SELECT
  patient_id,
  name,
  'MASKED' AS ssn,
  SUBSTR(diagnosis, 1, INSTR(diagnosis, ',')) AS diagnosis,
  medications,
  'MASKED' AS billing_amount
FROM ${selectedTable} 
WHERE ${selectedField} = '${selectedValue}';`
                :
                `SELECT
  patient_id,
  SUBSTR(name, 1, INSTR(name, ' ') + 1) AS name,
  'MASKED' AS ssn,
  'MASKED' AS diagnosis,
  'MASKED' AS medications,
  billing_amount
FROM ${selectedTable} 
WHERE ${selectedField} = '${selectedValue}';`
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
                  <td className="p-2 whitespace-nowrap text-yellow-500">Partial</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-green-500">Full</td>
                  <td className="p-2 whitespace-nowrap text-yellow-500">Partial</td>
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
                          setSelectedTable(e.target.value);
                          // Reset field and value when table changes
                          const newFields = getTableFields();
                          setSelectedField(newFields[0]);
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
                          setSelectedField(e.target.value);
                          // Reset value when field changes
                          const newValues = getFieldValues();
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
                  <button className="ml-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center">
                    <FileSearch className="h-4 w-4 mr-2" />
                    Execute
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
