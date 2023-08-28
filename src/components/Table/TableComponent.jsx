import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Pagination,
    getKeyValue
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import './Table.css';

const TableComponent = ({ data, columns, actions }) => {
    const navigate = useNavigate();
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;

    const pages = Math.ceil(data.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return data.slice(start, end);
    }, [page, data]);

    const getIcon = (type) => {
        switch (type) {
            case "edit":
                return <FaPen />;
            case "detail":
                return <FaEye />;
            case "delete":
                return <FaTrash />;
        }
    }
    const handleRedirectDetail = (id) => {
        navigate(`detail/${id}`);
    }
    const handleRedirectEdit = (id) => {
        navigate("detail");
    }
    const handleRedirectDelete = (id) => {
        navigate("detail");
    }

    const getRedirectFunction = (action, id) => {
        switch (action) {
            case "edit":
                return () => handleRedirectEdit(id);
            case "detail":
                return () => handleRedirectDetail(id);
            case "delete":
                return () => handleRedirectDelete(id);
        }
    }
    const getActionButtons = (id) => {
        return actions.map((action, i) => {
            return <Button
                size="sm"
                className="action-buttons"
                key={i}
                onClick={getRedirectFunction(action, id)}>{getIcon(action)}</Button>
        });
    }
    const pagination = <div className="flex w-full justify-center">
        <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
        />
    </div>;

    return (
        <div>
            <Table
                aria-label="Example table with dynamic content"
                bottomContent={pagination}
                classNames={{
                    wrapper: "min-h-[222px]",
                }}>
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        < TableRow key={item.id}>
                            {(columnKey) => <TableCell className={(columnKey === "actions") ? "actions-cont" : ''}>{(columnKey === "actions") ? getActionButtons(item.id) : getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div >
    )
}

export default TableComponent;