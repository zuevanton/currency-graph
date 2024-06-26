import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { ChangeEvent } from "react"
import { CurrenciesToShow } from "../../types/currencies.types.ts"

interface Props {
  status: CurrenciesToShow
  onChange: (newStatus: CurrenciesToShow) => void
}
export const CheckboxesGroup = ({ status, onChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...status, [e.target.name]: e.target.checked })
  }
  return (
    <FormGroup sx={{ marginBottom: "1rem" }}>
      <FormControlLabel
        control={
          <Checkbox
            inputProps={{ "aria-label": "controlled" }}
            checked={status.eur}
            onChange={handleChange}
            name="eur"
          />
        }
        label="Евро"
      />
      <FormControlLabel
        control={
          <Checkbox
            inputProps={{ "aria-label": "controlled" }}
            checked={status.usd}
            onChange={handleChange}
            name="usd"
          />
        }
        label="Доллар"
      />
      <FormControlLabel
        control={
          <Checkbox
            inputProps={{ "aria-label": "controlled" }}
            checked={status.cny}
            onChange={handleChange}
            name="cny"
          />
        }
        label="Юань"
      />
    </FormGroup>
  )
}
