import * as React from 'react'
import { Role } from '@renderer/hooks/stores/mapeoDeviceStore'

import { Layout } from './Layout'
import { SelectDevice } from './SelectDevice'
import { SelectRole } from './SelectRole'

type InviteStep =
  | { name: 'selectDevice' }
  | { name: 'selectRole'; deviceId: string }
  | { name: 'sendInvite'; deviceId: string; role: Role }

export const InviteDeviceModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [step, setStep] = React.useState<InviteStep>({ name: 'selectDevice' })

  return (
    <Layout
      open={open}
      onClose={onClose}
      onCloseEnd={() => {
        setStep({ name: 'selectDevice' })
      }}
    >
      {step.name === 'selectDevice' ? (
        <SelectDevice
          onDeviceClick={(deviceId) => {
            setStep({ name: 'selectRole', deviceId })
          }}
        />
      ) : step.name === 'selectRole' ? (
        <SelectRole
          deviceId={step.deviceId}
          onRoleSelect={(role) => {
            setStep({
              name: 'sendInvite',
              deviceId: step.deviceId,
              role,
            })
          }}
        />
      ) : null}
    </Layout>
  )
}
