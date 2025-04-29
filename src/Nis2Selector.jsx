import React, { useState } from 'react';

// Zorg dat Rubik-font geïmporteerd is in uw index.html of globale CSS:
// <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet">

const serviceLabels = {
  support: 'IT Support & Beheer',
  advanced: 'Advanced Security',
  dr: 'Disaster Recovery',
  compliance: 'Compliance',
  usercontract: 'User contract'
};

const levels = [
  {
    key: 'light',
    name: 'NIS2 Light',
    stars: 1,
    license: 'Minimale Microsoft-licentie: Business Premium (of extra P1-licentie)',
    items: [
      'MFA & Conditional Access',
      'Antivirus real-time (AV)',
      'Threat protection (EDR)',
      'Intune-management of RMM',
      'Wachtwoordbeleid',
      'Immutable back-up',
      'SOC/SIEM Endpoint'
    ]
  },
  {
    key: 'essential',
    name: 'NIS2 Essential',
    stars: 2,
    license: 'Minimale Microsoft-licentie: Business Premium (of extra P1-licentie)',
    items: [
      'MFA & Conditional Access',
      'Antivirus real-time (AV)',
      'Threat protection (EDR)',
      'Intune-management of RMM',
      'Wachtwoordbeleid',
      'Immutable back-up',
      'SOC/SIEM Endpoint',
      'Vulnerability patchmanagement',
      'SOC/SIEM User (CDR)',
      '(Managed) Awareness training',
      'Mailprotection',
      'Company specific risk assessment (Fysieke audits per jaar)'
    ]
  },
  {
    key: 'compliant',
    name: 'NIS2 Compliant',
    stars: 3,
    license: 'Minimale Microsoft-licentie: E3 Security',
    items: [
      'MFA & Conditional Access',
      'Antivirus real-time (AV)',
      'Threat protection (EDR)',
      'Intune-management of RMM',
      'Wachtwoordbeleid',
      'Immutable back-up',
      'SOC/SIEM Endpoint',
      'Vulnerability patchmanagement',
      'SOC/SIEM User (CDR)',
      '(Managed) Awareness training',
      'Mailprotection',
      'Company specific risk assessment (Fysieke audits per jaar)',
      'Bedrijfsrisicoanalyse (jaarlijks)',
      'Fysieke pentests (jaarlijks)',
      'Disaster recovery (eenmalig)',
      'Disaster simulation (jaarlijks)'
    ]
  }
];

export default function Nis2Selector() {
  const [services, setServices] = useState({
    support: true,
    advanced: false,
    dr: false,
    compliance: false,
    usercontract: false
  });

  const { support, advanced, dr, compliance: comp, usercontract } = services;
  let currentKey = null;
  if (support && advanced) {
    if (usercontract && dr && comp) currentKey = 'compliant';
    else if (usercontract) currentKey = 'essential';
    else currentKey = 'light';
  }

  const toggle = key => setServices(prev => ({ ...prev, [key]: !prev[key] }));
  const levelIndex = levels.findIndex(l => l.key === currentKey);

  return (
    <div className="p-8">
      <div className="absolute top-4 right-4">
        <img src="/VSA-Logo-2023.png" alt="VSA Logo" className="h-12" />
      </div>
      
      <h1 className="text-2xl font-medium mb-6" style={{ color: '#003965' }}>
        NIS2 Product- en Dienstenoverzicht
      </h1>

      <div className="flex flex-wrap mb-8">
        {Object.entries(serviceLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`service-button ${services[key] ? 'selected' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level, idx) => {
          const isActive = idx === levelIndex;
          const isPast = idx < levelIndex;

          return (
            <div key={level.key} className="card">
              <div className="flex justify-between items-center mb-2">
                <h2 className="card-title">{level.name}</h2>
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color: i < level.stars ? '#FFD700' : '#E5E7EB',
                        marginLeft: '2px'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <p className="card-subtitle">{level.license}</p>
              
              <ul className="item-list">
                {level.items.map((item, index) => {
                  const isEssentialLevel = level.key === 'essential';
                  const isCompliantLevel = level.key === 'compliant';
                  const spacerBeforeVuln = (isEssentialLevel || isCompliantLevel) && 
                    item === 'Vulnerability patchmanagement';
                  const spacerBeforeFirst = isCompliantLevel && index === 0;
                  const spacerAfterCompany = isCompliantLevel && 
                    item === 'Company specific risk assessment (Fysieke audits per jaar)';
                  const alwaysUnchecked = item === 'Company specific risk assessment (Fysieke audits per jaar)';
                  const checked = alwaysUnchecked ? false : idx <= levelIndex;
                  
                  return (
                    <React.Fragment key={item}>
                      {(spacerBeforeFirst || spacerBeforeVuln || spacerAfterCompany) && 
                        <div className="h-4" />
                      }
                      <li className="item">
                        <input
                          type="checkbox"
                          checked={checked}
                          readOnly
                          className="checkbox"
                        />
                        <span
                          style={{
                            color: isActive ? '#000' : 
                                   isPast ? '#9CA3AF' : 
                                   '#003965'
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
