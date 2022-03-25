import { useMemo, useState } from "react";
import "./App.css";
import {
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    TextField,
} from "@mui/material";

const useSortableData = (data, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

const CoinTable = (props) => {
    const { items, requestSort, sortConfig } = useSortableData(props.data);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    const setSearch = () => {
        return items.filter(
            (item) =>
                item.name.toLowerCase().includes(query) ||
                item.symbol.toLowerCase().includes(query)
        );
    };
    return (
        <>
            <div style={{ width: "80%", padding: "18px" }}>
                <TextField
                    variant="outlined"
                    onChange={(e) => setQuery(e.target.value)}
                    size="large"
                />
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    onClick={() => requestSort("rank")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Currency Rank
                                </TableCell>

                                <TableCell
                                    align="center"
                                    onClick={() => requestSort("name")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Currency Name
                                </TableCell>
                                <TableCell
                                    align="center"
                                    onClick={() => requestSort("symbol")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Currency Symbol
                                </TableCell>
                                <TableCell
                                    align="center"
                                    onClick={() => requestSort("price")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Currency Price
                                </TableCell>
                                <TableCell
                                    align="center"
                                    onClick={() => requestSort("change")}
                                    style={{ cursor: "pointer" }}
                                >
                                    Current Price Change
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {setSearch()
                                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                .map((coin) => (
                                    <TableRow key={coin.rank}>
                                        <TableCell align="center">
                                            {coin.rank}
                                        </TableCell>
                                        <TableCell align="center">
                                            {coin.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            {coin.symbol}
                                        </TableCell>
                                        <TableCell align="center">
                                            {parseFloat(coin.price).toFixed(3)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {coin.change}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div>
                <Pagination
                    count={items.length / 10}
                    onChange={(_, val) => {
                        setPage(val);
                    }}
                />
            </div>
        </>
    );
};

export default CoinTable;
