import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GeneralPurpose from "./GeneralPurpose/GeneralPurposePartialSearch.jsx";
import PrivateLabel from "./PrivateLabel/PrivateLabelPartialSearch.jsx"
import Home from "./HomePage"
import SwipeableViews from 'react-swipeable-views';
interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
  dir?:string
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index:any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const theme = useTheme()
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Private Label" {...a11yProps(1)} />
          <Tab label="General Purpose" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === 'rtl'? 'x-reverse':'x'} index={value}>
        <TabPanel value={value} index={0}>
          <Home/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PrivateLabel/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <GeneralPurpose/>  
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
