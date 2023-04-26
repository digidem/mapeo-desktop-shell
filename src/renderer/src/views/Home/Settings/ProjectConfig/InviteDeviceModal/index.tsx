import * as React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useTheme } from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi'
import { Role, useMapeoDeviceStoreAction } from '@renderer/hooks/stores/mapeoDeviceStore'
import { Dialog, DialogHeader, DialogActionsFooter } from '@renderer/components/Dialog'
import { Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'

import { Button } from '../Button'
import { Text } from '../Text'
import { SelectDevice } from './SelectDevice'
import { SelectRole } from './SelectRole'
import { SendInvite } from './SendInvite'

type InviteStep =
  | { name: 'selectDevice' }
  | { name: 'selectRole'; deviceId: string }
  | { name: 'sendInvite'; deviceId: string; role: Role }

export type InviteStatus = 'idle' | 'pending' | 'accepted' | 'declined' | 'error'

export const InviteDeviceModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { formatMessage: t } = useIntl()
  const { addDeviceToProject } = useMapeoDeviceStoreAction()

  const [inviteStatus, setInviteStatus] = React.useState<InviteStatus>('idle')
  const inviteTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const [step, setStep] = React.useState<InviteStep>({ name: 'selectDevice' })

  const theme = useTheme()

  const reachedFinalState = step.name === 'sendInvite' && inviteStatus === 'accepted'

  function safeOnClose() {
    if (inviteTimeoutRef.current) {
      clearTimeout(inviteTimeoutRef.current)
    }
    onClose()
  }

  function resetModalState() {
    setStep({ name: 'selectDevice' })
    setInviteStatus('idle')
  }

  return (
    <Dialog
      open={open}
      onClose={safeOnClose}
      onCloseEnd={resetModalState}
      header={
        <DialogHeader title={t(m.title)}>
          <Row>
            <WifiIcon sx={{ marginInlineEnd: spacing.small }} />
            <Text size="small" fontWeight="500" color={theme.blue.dark}>
              MiWifi - 5G
            </Text>
          </Row>
        </DialogHeader>
      }
      footer={
        <DialogActionsFooter
          rightButton={
            <Button
              noBorder
              disableElevation
              onClick={safeOnClose}
              variant={reachedFinalState ? 'contained' : 'outlined'}
              sx={reachedFinalState ? { backgroundColor: theme.blue.mid, color: theme.white } : undefined}
            >
              {t(getPrimaryButtonMessage(step.name, inviteStatus))}
            </Button>
          }
          leftButton={
            reachedFinalState ? (
              <Button
                variant="outlined"
                noBorder
                onClick={() => {
                  resetModalState()
                }}
              >
                {t(m.addAnotherDevice)}
              </Button>
            ) : undefined
          }
        />
      }
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
      ) : (step.name === 'sendInvite' && inviteStatus === 'idle') ||
        inviteStatus === 'pending' ||
        inviteStatus === 'accepted' ? (
        <SendInvite
          deviceId={step.deviceId}
          selectedRole={step.role}
          inviteStatus={inviteStatus}
          onSendInvite={() => {
            setInviteStatus('pending')
            inviteTimeoutRef.current = setTimeout(() => {
              addDeviceToProject(step.deviceId, step.role)
              setInviteStatus('accepted')
              inviteTimeoutRef.current = null
            }, 3000)
          }}
        />
      ) : null}
    </Dialog>
  )
}

function getPrimaryButtonMessage(stepName: InviteStep['name'], inviteStatus: InviteStatus) {
  if (stepName === 'sendInvite') {
    if (inviteStatus === 'pending') {
      return m.cancelInvitation
    }

    if (inviteStatus === 'accepted') {
      return m.close
    }

    return m.cancel
  } else {
    return m.cancel
  }
}

const m = defineMessages({
  title: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.index.title',
    defaultMessage: 'Invite Device',
  },
  cancel: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.index.cancel',
    defaultMessage: 'Cancel',
  },
  cancelInvitation: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.index.cancelInvitation',
    defaultMessage: 'Cancel Invitation',
  },
  close: {
    id: 'views.Home.Settings.ProjectConfig.InviteDeviceModal.index.close',
    defaultMessage: 'Close',
  },
  addAnotherDevice: {
    id: 'view.Home.Settings.ProjectConfig.InviteDeviceModal.index.addAnotherDevice',
    defaultMessage: 'Add Another Device',
  },
})
