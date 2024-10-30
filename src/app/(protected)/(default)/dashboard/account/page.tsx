'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  IdentificationIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import PaymentPayoutsBlock from '@/components/settings/payment-payouts/payment-payouts-block';
import LoginSecurity from '@/components/settings/login-security/login-security-block';
import PersonalInfoForm from '@/components/settings/form/personal-info-form';
import { TabItem, Tablist, TabPanel, TabPanels } from '@/components/ui/tab';
import Notifications from '@/components/settings/notifications';
import SelectBox from '@/components/ui/select-box';

// setting page tab data
const tabData = [
  {
    label: 'Personal Information',
    path: 0,
    icon: <IdentificationIcon className="h-auto w-5" />,
  },
  {
    label: 'Login & Security',
    path: 1,
    icon: <ShieldCheckIcon className="h-auto w-5" />,
  },
];

export default function AccountSettingsPage() {
  const [selected, setSelected] = useState(tabData[0].path);
  const [state, setState] = useState(tabData[0]);

  return (
    <div className=" my-5  ">
      <SelectBox
        value={state}
        className="lg:hidden"
        options={tabData}
        optionIcon={true}
        onChange={(data: any) => {
          setSelected(data.path);
          setState(data);
        }}
        buttonClassName="h-12 font-bold"
      />
      <Tab.Group
        selectedIndex={selected}
        onChange={(val) => setSelected(val)}
        vertical
      >
        <Tablist className="hidden lg:block mb-5">
          {tabData?.map((item) => (
            <TabItem
              key={item.path}
              className="w-full py-3 px-6"
              motionLayoutId="settingTab"
              motionClassName="!h-full top-0 !bg-secondaryBg w-1 !text-white !rounded-lg !-z-10"
            >
              <span className="flex items-center gap-4 ">
                {item.icon}
                {item.label}
              </span>
            </TabItem>
          ))}
        </Tablist>
        <TabPanels>
          <TabPanel>
            <PersonalInfoForm />
          </TabPanel>
          <TabPanel>
            <LoginSecurity />
          </TabPanel>
        </TabPanels>
      </Tab.Group>
    </div>
  );
}
