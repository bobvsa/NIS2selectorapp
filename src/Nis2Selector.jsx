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

  const primaryColor = '#003965';

  return (
    <div className="relative p-6" style={{ fontFamily: 'Rubik, sans-serif' }}>
      {/* Logo rechtsboven */}
      <div className="absolute top-6 right-6">
        <img src="/path/to/logo.png" alt="VSA Logo" className="h-12 w-auto" />
      </div>
      <h1
        className="text-3xl mb-4"
        style={{ color: primaryColor, fontFamily: 'Rubik Medium, sans-serif', fontWeight: 500 }}
      >
        NIS2 Product- en Dienstenoverzicht
      </h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(serviceLabels).map(([key, label]) => {
          const selected = services[key];
          return (
            <button
              key={key}
              onClick={() => toggle(key)}
              style={{
                backgroundColor: selected ? primaryColor : '#fff',
                color: selected ? '#fff' : primaryColor,
                borderColor: primaryColor,
                fontFamily: 'Rubik, sans-serif'
              }}
              className="px-4 py-1 rounded-full border transition"
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {levels.map((level, idx) => {
          const isActive = idx === levelIndex;
          const isPast = idx < levelIndex;
          const listSpacing = level.key === 'compliant' ? 'mt-6' : 'mt-2';
          return (
            <div
              key={level.key}
              className="rounded-lg p-4"
              style={{ backgroundColor: '#f1f5f9' }}
            >
              <div className="flex items-center justify-between mb-2">
                <h2
                  className="text-xl"
                  style={{
                    color: primaryColor,
                    fontFamily: 'Rubik Medium, sans-serif',
                    fontWeight: 500
                  }}
                >
                  {level.name}
                </h2>
                <div className="flex space-x-1">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className={i < level.stars ? 'text-yellow-400' : 'text-gray-300'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p
                className="font-medium mb-3"
                style={{ color: primaryColor, fontFamily: 'Rubik, sans-serif' }}
              >
                {level.license}
              </p>
              <ul className={`space-y-1 ${listSpacing}`}>  
                {level.items.map((item, index) => {
                  const isEssentialLevel = level.key === 'essential';
                  const isCompliantLevel = level.key === 'compliant';
                  const spacerBeforeVuln = (isEssentialLevel || isCompliantLevel) && item === 'Vulnerability patchmanagement';
                  const spacerBeforeFirst = isCompliantLevel && index === 0;
                  const spacerAfterCompany = isCompliantLevel && item === 'Company specific risk assessment (Fysieke audits per jaar)';
                  const alwaysUnchecked = item === 'Company specific risk assessment (Fysieke audits per jaar)';
                  const checked = alwaysUnchecked ? false : idx <= levelIndex;
                  const textColor = isActive ? '#000' : isPast ? '#9ca3af' : primaryColor;
                  return (
                    <React.Fragment key={item}>
                      {spacerBeforeFirst && <li className="h-2"></li>}
                      {spacerBeforeVuln && <li className="h-2"></li>}
                      <li className="flex items-center" style={{ fontFamily: 'Rubik, sans-serif' }}>
                        <span className="mr-2">{checked ? '✅' : '⬜'}</span>
                        <span style={{ color: textColor }}>{item}</span>
                      </li>
                      {spacerAfterCompany && <li className="h-2"></li>}
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
