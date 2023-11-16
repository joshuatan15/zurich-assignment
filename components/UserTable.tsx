import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/useUserStore";
import { setUser } from "@/store/useUserSlice";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { maskEmail } from "@/src/utils/general";
import Modal from "./Modal";

interface UserTableProps {
  users: IUser[];
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.text.primary,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: theme.palette.action.selected,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const users = useSelector((state: RootState) => state.users.users);
  const user = useSelector((state: RootState) => state.users.user);

  const [revealedEmails, setRevealedEmails] = useState<Set<number>>(new Set());
  const [emails, setEmails] = useState<{ [key: number]: string }>({});
  const [open, setOpen] = useState(false);

  // Updated styles for the table container to add spacing and shadow
  const tableContainerStyle = {
    marginTop: 4,
    boxShadow: "0 4px 12px 0 rgba(0,0,0,0.2)",
    borderRadius: 2,
  };

  // Updated styles for the avatar to be rounded with a shadow
  const avatarStyle = {
    mr: 2,
    width: 30,
    height: 30,
    boxShadow: "0 2px 4px 0 rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.2)",
    },
  };

  const fetchUserEmail = async (userId: number) => {
    const res = await fetch(`/api/user/${userId}`);
    const data = await res.json();
    if (res.ok) {
      return data.email;
    } else {
      throw new Error(data.error || "Failed to fetch email");
    }
  };

  const toggleEmailVisibility = async (userId: number): Promise<void> => {
    if (revealedEmails.has(userId)) {
      setRevealedEmails(prevRevealedEmails => {
        const newRevealedEmails = new Set(prevRevealedEmails);
        newRevealedEmails.delete(userId);
        return newRevealedEmails;
      });
    } else {
      // Check if the email is already fetched, to prevent any API spam
      if (!emails[userId]) {
        try {
          const email = await fetchUserEmail(userId);
          setEmails(prevEmails => ({ ...prevEmails, [userId]: email }));
        } catch (error) {
          console.error("Failed to fetch email:", error);
          return;
        }
      }
      setRevealedEmails(prevRevealedEmails => new Set(prevRevealedEmails).add(userId));
    }
  };
  

  const handleViewProfile = (user: IUser) => {
    dispatch(setUser(user));
    setOpen(true);
  };

  const closeViewProfile = () => {
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row, index) => (
              <StyledTableRow key={`${row.id}_${index}`}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell>
                  <div
                    className="flex flex-row items-center cursor-pointer"
                    onClick={() => handleViewProfile(row)}
                  >
                    <Avatar
                      alt={`${row.first_name} ${row.last_name}`}
                      src={row?.avatar || ""}
                      sx={avatarStyle}
                    />
                    <Typography
                      sx={{
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      {`${row.first_name} ${row.last_name}`}
                    </Typography>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  {revealedEmails.has(row.id!) ? (
                    <>
                      <span>{emails[row.id!]}</span>
                      <IconButton
                        onClick={() => toggleEmailVisibility(row.id!)}
                        aria-label="hide email"
                      >
                        <MdVisibilityOff />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <span>***********</span>
                      <IconButton
                        onClick={() => toggleEmailVisibility(row.id!)}
                        aria-label="show email"
                      >
                        <MdVisibility />
                      </IconButton>
                    </>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={closeViewProfile} user={user} />
    </>
  );
};

export default UserTable;
