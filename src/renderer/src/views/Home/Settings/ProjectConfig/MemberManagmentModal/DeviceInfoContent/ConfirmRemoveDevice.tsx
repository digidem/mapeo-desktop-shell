import { Column, Row } from '@renderer/components/LayoutComponents'
import ErrorIcon from '@mui/icons-material/Error'
import { defineMessages, useIntl } from 'react-intl'

import { useMapeoDeviceStore, useMapeoDeviceStoreAction } from '@renderer/hooks/stores/mapeoDeviceStore'
import { Button } from '../../Button'
import { theme } from '@renderer/theme'
import { Typography } from '@mui/material'

const m = defineMessages({
  removeConfirmation: {
    id: 'Settings.ProjectConfig.MemberManagement.ConfirmRemoveDevice.removeConfirmation',
    defaultMessage: 'Are you sure you want to remove {name} ({id})?',
  },
  subtitle: {
    id: 'Settings.ProjectConfig.MemberManagement.ConfirmRemoveDevice.subtitle',
    defaultMessage:
      'Their data will remain with the project but their device will be unable to sync or add new observations',
  },
  cancel: {
    id: 'Settings.ProjectConfig.MemberManagement.ConfirmRemoveDevice.cancel',
    defaultMessage: 'Cancel',
  },
  removeDevice: {
    id: 'Settings.ProjectConfig.MemberManagement.ConfirmRemoveDevice.removeDevice',
    defaultMessage: 'Remove Device',
  },
})

type ConfirmRemoveDeviceProps = {
  deviceId: string
  closeModal: () => void
  resetOnDelete: () => void
}

export const ConfirmRemoveDevice = ({ deviceId, closeModal, resetOnDelete }: ConfirmRemoveDeviceProps) => {
  if (!deviceId) return null
  const { formatMessage: t } = useIntl()
  const name = useMapeoDeviceStore((store) => store.memberDevices[deviceId].name)
  const removeDevice = useMapeoDeviceStoreAction().removeDeviceFromProject

  function handleRemoveDevice() {
    removeDevice(deviceId)
    resetOnDelete()
    closeModal()
  }

  return (
    <Column height={'100%'} justifyContent={'space-between'}>
      <Row padding={8} justifyContent="center" width={'100%'}>
        <Column maxWidth="60%" alignItems="center" spacing={3}>
          <Row>
            <ErrorIcon style={{ fontSize: 100 }} />
          </Row>
          <Row>
            <Typography variant="h1" textAlign="center" fontSize={24} fontWeight={500}>
              {t(m.removeConfirmation, { name: name, id: deviceId })}
            </Typography>
          </Row>
          <Row>
            <Typography variant="h2" textAlign="center" fontSize={22} fontWeight={400}>
              {t(m.subtitle)}
            </Typography>
          </Row>
        </Column>
      </Row>
      <Row
        justifyContent="space-between"
        alignItems="center"
        sx={{
          paddingY: 2,
          paddingX: 4,
          borderTop: '1px solid',
          borderColor: theme.grey.light,
          width: '100%',
        }}
      >
        <Button
          noBorder
          disableElevation
          variant="contained"
          sx={{ backgroundColor: theme.warningRed, color: theme.white }}
          onClick={handleRemoveDevice}
        >
          {t(m.removeDevice)}
        </Button>
        <Button noBorder disableElevation variant="text" sx={{ color: theme.blue.mid }} onClick={closeModal}>
          {t(m.cancel)}
        </Button>
      </Row>
    </Column>
  )
}
