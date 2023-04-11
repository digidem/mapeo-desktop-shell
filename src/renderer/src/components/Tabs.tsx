import styled from '@emotion/styled'
import MuiTabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

const StyledTabs = styled(MuiTabs)<{ colorText: string; colorSelected: string }>`
  flex: 1;
  position: relative;
  & .MuiTabs-indicator {
    background-color: ${(props) => props.colorSelected};
  }

  color: ${(props) => props.colorText};
`

const StyledTab = styled(Tab)<{ colorSelected: string }>`
  &.MuiTab-root {
    text-transform: capitalize;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 20px;
    font-size: 1rem;
    opacity: unset;
  }

  &.Mui-selected {
    background-color: ${(props) => props.colorSelected}33;
  }
`

export type TabData<Value> = {
  icon?: React.ReactElement
  label: string
  value: Value
  sx?: React.ComponentProps<typeof Tab>['sx']
}

interface Props<Value> {
  activeTab: Value
  onChangeTab: (value: Value) => void
  data: TabData<Value>[]
  colorSelected: string
  colorText: string
}

export function Tabs<Value extends string>({
  activeTab,
  onChangeTab,
  data,
  colorSelected,
  colorText,
}: Props<Value>) {
  return (
    <StyledTabs
      orientation="vertical"
      textColor="inherit"
      variant="scrollable"
      value={activeTab}
      onChange={(_, value) => onChangeTab(value)}
      colorSelected={colorSelected}
      colorText={colorText}
    >
      {data.map((d) => (
        <StyledTab {...d} iconPosition="start" key={d.value} colorSelected={colorSelected} sx={d.sx} />
      ))}
    </StyledTabs>
  )
}
