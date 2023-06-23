import { Button, Card } from "@material-ui/core";

const PaymentHistory = () => {
    return (
        <div>
            <h1>Payment History</h1>
            <Card variant="outlined">6th sem.|| B.tech || 21/Jan/2023 || 11:45pm || <Button color="primary" variant="contained">Show</Button></Card>
            <Card variant="outlined">6th sem.|| B.tech || 02/Oct/2022 || 11:45pm || <Button color="primary" variant="contained">Show</Button></Card>
        </div>
    )
}

export default PaymentHistory;