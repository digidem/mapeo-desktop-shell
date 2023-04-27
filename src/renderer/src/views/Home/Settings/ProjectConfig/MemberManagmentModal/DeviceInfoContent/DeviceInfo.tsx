import { Column, Row } from '@renderer/components/LayoutComponents'
import { Role, useMapeoDeviceStore, useMapeoDeviceStoreAction } from '@renderer/hooks/stores/mapeoDeviceStore'
import desktopImageUrl from '@assets/desktop.png'
import mobileImageUrl from '@assets/mobile.png'
import PersonAddIcon from '@mui/icons-material/PersonAddAltOutlined'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { spacing } from '@renderer/theme/spacing'
import { defineMessages, useIntl } from 'react-intl'
import { theme } from '@renderer/theme'
import { Button } from '../../Button'
import { useState } from 'react'
import { MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'

const m = defineMessages({
  dateAdded: {
    id: 'views.Home.Settings.ProjectConfig.DeviceInfoContent.dateAdded',
    defaultMessage: 'Added: {date}',
  },
  role: {
    id: 'views.Home.Settings.ProjectConfig.DeviceInfoContent.role',
    defaultMessage: 'Role:',
  },
  changeRole: {
    id: 'views.Home.Settings.ProjectConfig.DeviceInfoContent.changeRole',
    defaultMessage: 'Change Role',
  },
  pastDeviceNames: {
    id: 'views.Home.Settings.ProjectConfig.DeviceInfoContent.pastDeviceNames',
    defaultMessage: 'Past Device Names:',
  },
  close: {
    id: 'views.Home.Settings.ProjectConfig.DeviceInfoContent.close',
    defaultMessage: 'Close',
  },
  removeDevice: {
    id: 'views.Home.Settings.ProjectConfig.DeviceInfoContent.removeDevice',
    defaultMessage: 'Remove Device',
  },
  coordinator: {
    id: 'views.Home.Settings.ProjectConfig.DeviceInfoContent.coordinator',
    defaultMessage: 'Coordinator',
  },
  participant: {
    id: 'views.Home.Settings.ProjectConfig.DeviceInfoContent.participant',
    defaultMessage: 'Participant',
  },
})

type DeviceInfoProps = {
  moveToConfirmationScreen: () => void
  closeModal: () => void
  deviceId: string
}

export const DeviceInfo = ({ closeModal, deviceId, moveToConfirmationScreen }: DeviceInfoProps) => {
  const [changingRole, setChangingRole] = useState(false)

  const device = useMapeoDeviceStore((store) => store.memberDevices[deviceId])

  const changeRole = useMapeoDeviceStoreAction().changeDeviceRole

  const { formatMessage: t } = useIntl()

  function handleSelectChange(e: SelectChangeEvent) {
    changeRole(deviceId, e.target.value as Role)
  }

  return (
    <Column height={'100%'} justifyContent={'space-between'}>
      <Row padding={4}>
        <Column alignItems="flex-start" spacing={2}>
          <Row alignItems="center">
            <Column marginRight={spacing.medium}>
              <img
                src={device.deviceType === 'desktop' ? desktopImageUrl : mobileImageUrl}
                style={{ display: 'block', maxWidth: '100%', width: '40px' }}
              />
            </Column>
            <Column marginLeft={1}>
              <Row>
                <Typography fontWeight={500} fontSize={24}>
                  {device.name}
                </Typography>
              </Row>
              <Row>
                <Typography fontSize={24} fontWeight={400}>
                  {device.deviceId}
                </Typography>
              </Row>
              <Row>
                <Typography fontSize={16}>
                  {t(m.dateAdded, { date: new Date(device.dateAdded).toLocaleDateString() })}
                </Typography>
              </Row>
            </Column>
          </Row>
          <Row>
            <Column>
              <Row>
                <Typography fontSize={18}>{t(m.role)}</Typography>
              </Row>
              {changingRole ? (
                <Row alignItems="flex-start">
                  <Select value={device.role} onChange={handleSelectChange}>
                    <MenuItem
                      onClick={() => {
                        setChangingRole(false)
                      }}
                      value={'coordinator'}
                    >
                      {' '}
                      {t(m.coordinator)}{' '}
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setChangingRole(false)
                      }}
                      value={'participant'}
                    >
                      {' '}
                      {t(m.participant)}
                    </MenuItem>
                  </Select>
                </Row>
              ) : (
                <Row alignItems="center">
                  <Column>
                    {device.role === 'coordinator' ? (
                      <ManageAccountsIcon fontSize="large" htmlColor={theme.black} />
                    ) : (
                      <PersonAddIcon fontSize="large" htmlColor={theme.black} />
                    )}
                  </Column>
                  <Column marginLeft={1}>
                    <Typography textTransform={'capitalize'} fontSize={16}>
                      {device.role}
                    </Typography>
                  </Column>
                  <Column>
                    <Button
                      noBorder
                      variant="text"
                      onClick={() => setChangingRole(true)}
                      style={{ marginLeft: 10 }}
                    >
                      <Typography style={{ textTransform: 'none' }} fontSize={14}>
                        {t(m.changeRole)}
                      </Typography>
                    </Button>
                  </Column>
                </Row>
              )}
            </Column>
          </Row>
          <Row>
            <Column>
              <Typography fontSize={18}>{t(m.pastDeviceNames)}</Typography>
              {device.pastDeviceNames?.map((name) => (
                <Row>
                  <Typography fontSize={18}>{name}</Typography>
                </Row>
              ))}
            </Column>
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
        <Button noBorder variant="text" sx={{ color: theme.warningRed }} onClick={moveToConfirmationScreen}>
          {t(m.removeDevice)}
        </Button>
        <Button
          noBorder
          disableElevation
          variant="contained"
          sx={{ backgroundColor: theme.blue.mid, color: theme.white }}
          onClick={closeModal}
        >
          {t(m.close)}
        </Button>
      </Row>
    </Column>
  )
}
