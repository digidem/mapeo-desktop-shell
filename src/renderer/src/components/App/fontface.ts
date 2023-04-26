import { css } from '@mui/material'
import RubikRegular from '../../../assets/fonts/Rubik-Regular.ttf'
import RubikMedium from '../../../assets/fonts/Rubik-Medium.ttf'
import RubikBold from '../../../assets/fonts/Rubik-Bold.ttf'
import RubikItalic from '../../../assets/fonts/Rubik-Italic.ttf'
import RubikMediumItalic from '../../../assets/fonts/Rubik-MediumItalic.ttf'
import RubikBoldItalic from '../../../assets/fonts/Rubik-BoldItalic.ttf'
import RobotoRegular from '../../../assets/fonts/Roboto-Regular.ttf'
import RobotoMedium from '../../../assets/fonts/Roboto-Medium.ttf'
import RobotoBold from '../../../assets/fonts/Roboto-Medium.ttf'
import RobotoItalic from '../../../assets/fonts/Roboto-Italic.ttf'
import RobotoMediumItalic from '../../../assets/fonts/Roboto-MediumItalic.ttf'
import RobotoBoldItalic from '../../../assets/fonts/Roboto-BoldItalic.ttf'

export const fontFace = css`
  /* ----------- */
  /*    Rubik    */
  /* ----------- */
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    src: local('Rubik'), local('Rubik-Regular'), url(${RubikRegular});
  }

  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 500;
    src: local('Rubik'), local('Rubik-Medium'), url(${RubikMedium});
  }

  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    src: local('Rubik'), local('Rubik-Bold'), url(${RubikBold});
  }

  @font-face {
    font-family: 'Rubik';
    font-style: italic;
    font-weight: 400;
    src: local('Rubik'), local('Rubik-Italic'), url(${RubikItalic});
  }

  @font-face {
    font-family: 'Rubik';
    font-style: italic;
    font-weight: 500;
    src: local('Rubik'), local('Rubik-MediumItalic'), url(${RubikMediumItalic});
  }

  @font-face {
    font-family: 'Rubik';
    font-style: italic;
    font-weight: 700;
    src: local('Rubik'), local('Rubik-BoldItalic'), url(${RubikBoldItalic});
  }

  /* ------------ */
  /*    Roboto    */
  /* ------------ */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto'), local('Rubik-Regular'), url(${RobotoRegular});
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local('Roboto'), local('Rubik-Medium'), url(${RobotoMedium});
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local('Roboto'), local('Rubik-Bold'), url(${RobotoBold});
  }

  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    src: local('Roboto'), local('Rubik-Italic'), url(${RobotoItalic});
  }

  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 500;
    src: local('Roboto'), local('Rubik-MediumItalic'), url(${RobotoMediumItalic});
  }

  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 700;
    src: local('Roboto'), local('Rubik-BoldItalic'), url(${RobotoBoldItalic});
  }
`
