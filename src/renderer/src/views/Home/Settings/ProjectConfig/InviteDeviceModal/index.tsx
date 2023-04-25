import * as React from 'react'
import { Device } from '@renderer/hooks/stores/mapeoDeviceStore'

import { Layout } from './Layout'
import { SelectDevice } from './SelectDevice'

type InviteStep =
  | { name: 'selectDevice' }
  | { name: 'selectRole'; device: Device }
  | { name: 'sendInvite'; device: Device }

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
          onDeviceClick={(device) => {
            setStep({ name: 'selectRole', device })
          }}
        />
      ) : step.name === 'selectRole' ? null : null}
    </Layout>
  )
}
