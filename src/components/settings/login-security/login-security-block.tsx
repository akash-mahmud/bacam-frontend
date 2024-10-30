'use client';

import ChangePassword from '@/components/settings/form/change-password';

export default function LoginSecurity() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:gap-12">
      <ChangePassword />
    </div>
  );
}
