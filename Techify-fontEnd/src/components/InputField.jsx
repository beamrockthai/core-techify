const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="form-control w-full mb-4">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type={type}
      name={name} // ✅ เพิ่ม name เข้าไป
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered w-full"
    />
  </div>
);

export default InputField;
