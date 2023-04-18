import styled from '@emotion/styled'
import MuiTabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Typography } from '@mui/material'

const StyledTabs = styled(MuiTabs)<{
  color: React.CSSProperties['color']
  selectedColor: React.CSSProperties['color']
}>(
  ({ color, selectedColor }) => `
  flex: 1;
  position: relative;
  & .MuiTabs-indicator {
    background-color: ${selectedColor};
  }

  color: ${color};
`,
)

const StyledTab = styled(Tab)<{
  iconColor?: React.CSSProperties['color']
  selectedColor: React.CSSProperties['color']
}>(
  ({ iconColor, selectedColor }) => `
  &.MuiTab-root {
    text-transform: capitalize;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 24px;
    font-size: 1rem;
    opacity: unset;
  }

  &.Mui-selected {
    background-color: ${selectedColor};
  }

  & .MuiTab-iconWrapper {
    color: ${iconColor};
  }
`,
)

const StyledLabel = styled.div(`
  text-align: left;
`)

export type TabData<Value> = {
  icon?: React.ReactElement
  title: string
  subtitle?: string
  value: Value
  sx?: React.ComponentProps<typeof Tab>['sx']
}

interface Props<Value> {
  activeTab: Value
  onChangeTab: (value: Value) => void
  data: TabData<Value>[]
  selectedColor: React.CSSProperties['color']
  titleColor: React.CSSProperties['color']
  subtitleColor?: React.CSSProperties['color']
}

export function Tabs<Value extends string>({
  activeTab,
  onChangeTab,
  data,
  selectedColor,
  titleColor,
  subtitleColor,
}: Props<Value>) {
  return (
    <StyledTabs
      orientation="vertical"
      textColor="inherit"
      variant="scrollable"
      value={activeTab}
      onChange={(_, value) => onChangeTab(value)}
      selectedColor={selectedColor}
      color={titleColor}
    >
      {data.map((d) => (
        <StyledTab
          {...d}
          iconPosition="start"
          key={d.value}
          selectedColor={selectedColor}
          sx={d.sx}
          iconColor={subtitleColor || titleColor}
          label={
            <StyledLabel>
              <Typography color={titleColor}>{d.title}</Typography>
              {d.subtitle && (
                <Typography variant="subtitle1" color={subtitleColor} fontSize={'0.75em'}>
                  {d.subtitle}
                </Typography>
              )}
            </StyledLabel>
          }
        />
      ))}
    </StyledTabs>
  )
}
