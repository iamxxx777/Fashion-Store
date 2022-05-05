import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts'

const Chart = ({ data }) => {
    return (
        <div className="charts">
            <div className="charts_container">
                <div className="contain">
                    <h2>Sale Stats</h2>
                    <LineChart width={620} height={300} data={data}>
                        <Line type="monotone" dataKey="value" stroke="#D23F57" margin={{ top: 5, right: 10, bottom: 5, left: 0 }} />
                        <CartesianGrid stroke="#2B3445" strokeDasharray="2 5" />
                        <XAxis dataKey="month" />
                        <YAxis />
                    </LineChart>
                </div>
            </div>
        </div>
    )
}


export default Chart