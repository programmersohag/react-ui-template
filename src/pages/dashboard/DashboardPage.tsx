import {
    Box, Card, CardContent,
    Grid,
    Typography,
} from '@mui/material';
import {BarChart, LineChart} from "@mui/x-charts";

const DashboardPage = () => {
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Dashboard Overview
            </Typography>
            <Grid container spacing={3}>
                {/* Metric Cards */}
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Total Sales
                            </Typography>
                            <Typography variant="h4">$12,345</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                New Users
                            </Typography>
                            <Typography variant="h4">567</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Orders Pending
                            </Typography>
                            <Typography variant="h4">34</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Conversion Rate
                            </Typography>
                            <Typography variant="h4">2.5%</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Charts */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Monthly Revenue
                            </Typography>
                            <Box sx={{height: 300}}>
                                <BarChart
                                    dataset={[
                                        {month: 'Jan', revenue: 1200},
                                        {month: 'Feb', revenue: 1500},
                                        {month: 'Mar', revenue: 1300},
                                        {month: 'Apr', revenue: 1800},
                                        {month: 'May', revenue: 2000},
                                        {month: 'Jun', revenue: 2200},
                                    ]}
                                    xAxis={[{scaleType: 'band', dataKey: 'month'}]}
                                    series={[{dataKey: 'revenue', label: 'Revenue'}]}
                                    layout="vertical"
                                    width={400} // Adjust width as needed for your layout
                                    height={250}
                                    margin={{top: 20, right: 30, bottom: 30, left: 50}}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                User Growth
                            </Typography>
                            <Box sx={{height: 300}}>
                                <LineChart
                                    xAxis={[{data: [1, 2, 3, 4, 5, 6], label: 'Month'}]}
                                    series={[
                                        {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                                            label: 'Users',
                                        },
                                    ]}
                                    width={400} // Adjust width as needed for your layout
                                    height={250}
                                    margin={{top: 20, right: 30, bottom: 30, left: 50}}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Placeholder for more content */}
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Recent Activity</Typography>
                            <Typography>No new activity.</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage;