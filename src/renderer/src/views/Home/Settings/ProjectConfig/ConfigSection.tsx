import * as React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import { useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import FileUploadIcon from '@mui/icons-material/FileUploadOutlined'
import QuestionMarkIcon from '@mui/icons-material/QuestionMarkOutlined'
import { Column, Row } from '@renderer/components/LayoutComponents'
import { spacing } from '@renderer/theme/spacing'

import { Text } from './Text'
import { PressableText } from './PressableText'
import { useMapeoDeviceStore } from '@renderer/hooks/stores/mapeoDeviceStore'

const m = defineMessages({
  projectName: {
    id: 'views.Home.Settings.ProjectConfig.ConfigSection.projectName',
    defaultMessage: 'Project Name',
  },
  config: {
    id: 'views.Home.Settings.ProjectConfig.ConfigSection.config',
    defaultMessage: 'Config',
  },
  edit: {
    id: 'views.Home.Settings.ProjectConfig.ConfigSection.edit',
    defaultMessage: 'Edit',
  },
  importConfig: {
    id: 'views.Home.Settings.ProjectConfig.ConfigSection.importConfig',
    defaultMessage: 'Import Config',
  },
  newProjectInfo: {
    id: 'views.Home.Settings.ProjectConfig.ConfigSection.newProjectInfo',
    defaultMessage:
      'To create or join a new project you will have to leave your current project. Your data can not be transferred to the new project.',
  },
  learnMore: {
    id: 'views.Home.Settings.ProjectConfig.ConfigSection.learnMore',
    defaultMessage: 'Learn More',
  },
})

const QuestionIconContainer = styled.div(
  ({ backgroundColor }: { backgroundColor: React.CSSProperties['backgroundColor'] }) => `
  display: flex;
  padding: ${spacing.medium};
  border-radius: 50%;
  margin-inline-end: ${spacing.large};
  background-color: ${backgroundColor};
`,
)

export const ConfigSection = () => {
  const { formatMessage: t } = useIntl()
  const projectName = useMapeoDeviceStore((store) => store.projectName)
  const theme = useTheme()

  return (
    <Column
      padding={spacing.large}
      sx={{ backgroundColor: theme.background }}
      borderBottom={`1px solid ${theme.grey.light}`}
      spacing={spacing.large}
    >
      <Row spacing={12}>
        <Column spacing={spacing.small}>
          <Row>
            <Text size="medium" fontWeight="600">
              {t(m.projectName)}
            </Text>
          </Row>
          <Row>
            <Text size="medium">{projectName}</Text>
          </Row>
          <Row>
            <PressableText onClick={() => {}} Icon={EditIcon}>
              {t(m.edit)}
            </PressableText>
          </Row>
        </Column>
        <Column spacing={spacing.small}>
          <Row>
            <Text size="medium" fontWeight="600">
              {t(m.config)}
            </Text>
          </Row>
          <Row>
            <Text size="medium">my-special-config-20.mapeoconfig</Text>
          </Row>
          <Row>
            <PressableText onClick={() => {}} Icon={FileUploadIcon}>
              {t(m.importConfig)}
            </PressableText>
          </Row>
        </Column>
      </Row>
      <Row
        sx={{ backgroundColor: theme.grey.light }}
        borderRadius="10px"
        padding={spacing.large}
        alignItems="center"
        flex={1}
      >
        <QuestionIconContainer backgroundColor={theme.background}>
          <QuestionMarkIcon sx={{ color: theme.grey.main }} />
        </QuestionIconContainer>
        <Text size="small">
          {t(m.newProjectInfo)}&nbsp;
          <Link to="#" style={{ textDecoration: 'none', color: theme.blue.main, fontWeight: '500' }}>
            {t(m.learnMore)}
          </Link>
        </Text>
      </Row>
    </Column>
  )
}
