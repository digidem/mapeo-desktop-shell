import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import ComputerIcon from '@mui/icons-material/Computer'
import { theme } from '@renderer/theme'
import { DeviceType } from '@renderer/hooks/stores/mapeoDeviceStore'

export const DeviceIcon = ({ type }: { type: DeviceType }) => {
  return (
    <div
      style={{
        backgroundColor: theme.grey.light,
        padding: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
      }}
    >
      {type === 'mobile' ? <PhoneAndroidIcon fontSize="large" /> : <ComputerIcon fontSize="large" />}
    </div>
  )
}
