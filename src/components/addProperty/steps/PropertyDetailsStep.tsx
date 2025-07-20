import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import clsx from "clsx";
import { FormValues } from "../AddPropertyForm"; // Assuming FormValues includes 'location', 'state', and 'city'

type PropertyDetailsStepProps = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  inputClass: string;
  errorClass: string;
};

// Data for states and cities - Ideally, this would come from an API
const indiaStatesAndUTs = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry", "Ladakh", "Jammu and Kashmir"];

const citiesByState: { [key: string]: string[] } = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati", "Kakinada", "Ongole", "Eluru", "Machilipatnam", "Kadapa", "Anantapur", "Chittoor", "Srikakulam", "Vizianagaram", "Tenali", "Proddatur", "Adoni", "Bhimavaram", "Madanapalle", "Guntakal", "Dharmavaram", "Gudivada", "Narasaraopet", "Tadepalligudem", "Amaravati", "Amalapuram", "Chilakaluripet", "Palakollu", "Rayachoti", "Tadipatri", "Nandyal", "Sattenapalle", "Ponnur", "Kovvur", "Markapur", "Kandukur", "Piduguralla", "Mangalagiri", "Nuzvid", "Samalkota", "Vinukonda", "Yemmiganur", "Sullurpeta", "Pulivendula", "Punganur", "Renigunta", "Chirala", "Venkatagiri", "Nagari", "Kuppam", "Parvathipuram", "Giddalur", "Pithapuram", "Ramachandrapuram", "Mandapeta", "Yelamanchili"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Bomdila", "Ziro", "Along", "Roing"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Goalpara", "Karimganj"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Arrah", "Munger", "Purnia", "Saharsa", "Katihar", "Chhapra", "Bettiah", "Motihari", "Begusarai", "Siwan", "Gopalganj", "Madhubani", "Samastipur", "Kishanganj"],
  Chhattisgarh: ["Raipur", "Bhilai", "Durg", "Bilaspur", "Korba", "Rajnandgaon", "Ambikapur", "Jagdalpur", "Chirmiri", "Dhamtari"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Curchorem", "Sanquelim", "Valpoi", "Cuncolim"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Anand", "Nadiad", "Porbandar", "Junagadh", "Morbi", "Bharuch", "Surendranagar", "Mehsana", "Bhuj", "Veraval", "Patan"],
  Haryana: ["Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind", "Thanesar", "Kaithal", "Rewari", "Palwal"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Kangra", "Kullu", "Chamba", "Una", "Hamirpur", "Palampur"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Phusro", "Giridih", "Deoghar", "Hazaribagh", "Ramgarh", "Medininagar", "Chas", "Jhumri Tilaiya", "Godda", "Sahibganj"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Shivamogga", "Tumakuru", "Raichur", "Kalaburagi (Gulbarga)", "Bidar", "Udupi", "Vijayapura", "Chitradurga", "Hassan", "Gadag", "Robertsonpet", "Hosapete"],
  Kerala: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Malappuram", "Kannur", "Kottayam", "Kasaragod", "Idukki", "Pathanamthitta", "Wayanad"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Murwara (Katni)", "Singrauli", "Burhanpur", "Khandwa", "Morena", "Bhind", "Guna", "Shivpuri", "Chhindwara", "Damoh"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Thane", "Amravati", "Nanded", "Sangli", "Akola", "Malegaon", "Dhule", "Latur", "Ahmednagar", "Chandrapur", "Parbhani", "Jalgaon", "Bhusawal"],
  Manipur: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul", "Kakching", "Lilong", "Mayang Imphal", "Nambol"],
  Meghalaya: ["Shillong", "Tura", "Jowai", "Nongstoin", "Baghmara", "Williamnagar", "Resubelpara", "Mairang", "Mawkyrwat"],
  Mizoram: ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Mamit", "Thenzawl"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Tuensang", "Zunheboto", "Mon", "Kiphire", "Phek", "Longleng"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jeypore", "Baleshwar", "Barbil", "Dhenkanal", "Paralakhemundi", "Rayagada"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga", "Barnala", "Malerkotla", "Khanna", "Phagwara", "Muktsar", "Ferozepur"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Sikar", "Pali", "Alwar", "Bharatpur", "Bhilwara", "Ganganagar", "Hanumangarh", "Beawar", "Churu", "Jhunjhunu", "Tonk", "Kishangarh"],
  Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Singtam", "Rangpo", "Nayabazar", "Rhenock", "Chungthang"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi", "Karur", "Nagercoil", "Pollachi", "Kumbakonam", "Rajapalayam", "Pudukkottai"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Kothagudem", "Khammam", "Mahabubnagar", "Adilabad", "Suryapet", "Miryalaguda", "Nalgonda", "Jagtial", "Mancherial", "Kamareddy", "Peddapalli", "Siddipet", "Vikarabad", "Jangaon", "Bhongir", "Gadwal", "Wanaparthy", "Sangareddy", "Medak", "Nagarkurnool", "Nirmal", "Palwancha", "Bodhan", "Armoor", "Kodad", "Bellampally", "Kagaznagar", "Koratla", "Sathupalli"],
  Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kumarghat", "Kailasahar", "Belonia", "Sonamura", "Ambassa", "Santirbazar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Prayagraj", "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Faizabad", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur", "Badaun", "Noida", "Greater Noida", "Hapur", "Etawah", "Ayodhya"],
  Uttarakhand: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Almora", "Nainital", "Kotdwar"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Haldia", "Kharagpur", "Malda", "Berhampore", "Jalpaiguri", "North Barrackpur", "Barrackpur", "Serampore", "Chandannagar", "Bansberia", "Raiganj", "Baharampur", "Krishnanagar"],
  "Andaman and Nicobar Islands": ["Port Blair", "Garacharma", "Bambooflat", "Diglipur", "Mayabunder"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa", "Diu"],
  Delhi: ["New Delhi", "Delhi (National Capital Region includes parts of Noida, Ghaziabad, Gurugram, Faridabad)"],
  Lakshadweep: ["Kavaratti", "Agatti", "Minicoy", "Andrott"],
  Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  Ladakh: ["Leh", "Kargil"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore", "Kathua", "Rajouri", "Udhampur", "Handwara", "Pulwama"],
};

const PropertyDetailsStep = ({
  register,
  errors,
  watch,
  inputClass,
  errorClass,
}: PropertyDetailsStepProps) => {
  const selectedType = watch("type");
  const selectedState = watch("state"); // Watch the selected state
  const bedroomOptions = Array.from({ length: 6 }, (_, i) => i + 1)
    .map(String)
    .concat("6+");
  const bathroomOptions = Array.from({ length: 6 }, (_, i) => i + 1)
    .map(String)
    .concat("6+");
  const facingOptions = [
    "Not Specified",
    "North",
    "South",
    "East",
    "West",
    "North-East",
    "North-West",
    "South-East",
    "South-West",
  ];

  const availableCities = selectedState
    ? citiesByState[selectedState] || []
    : [];

  return (
    <div className="space-y-6">
      {/* Location, State, and City Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="state"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            State/Union Territory <span className="text-red-500">*</span>
          </label>
          <select
            id="state"
            {...register("state", {
              required: "State/Union Territory is required",
            })}
            className={clsx(inputClass, errors.state && errorClass)}
          >
            <option value="">Select State/Union Territory</option>
            {indiaStatesAndUTs.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            City <span className="text-red-500">*</span>
          </label>
          <select
            id="city"
            {...register("city", { required: "City is required" })}
            className={clsx(inputClass, errors.city && errorClass)}
            disabled={!selectedState || availableCities.length === 0} // Disable if no state or no cities
          >
            <option value="">Select City</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>
      </div>

      {/* Property Address and Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Property Address <span className="text-red-500">*</span>
          </label>
          <input
            id="address"
            {...register("address", {
              required: "Property address is required",
            })}
            placeholder="Property Address"
            className={clsx(inputClass, errors.address && errorClass)}
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            placeholder="e.g., Prime Land for Sale, Spacious 3BHK Apartment"
            className={clsx(inputClass, errors.title && errorClass)}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>
      </div>

      {/* Property Type and Sale/Rent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Property Type
          </label>
          <select id="type" {...register("type")} className={inputClass}>
            <option value="land">Open Land / Farm Land</option>
            <option value="building">House Property</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="saleType"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Sale/Rent
          </label>
          <select
            id="saleType"
            {...register("saleType")}
            className={inputClass}
          >
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        {selectedType === "land" && (
          <div>
            <label
              htmlFor="landCategory"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Land Category
            </label>
            <select
              id="landCategory"
              {...register("landCategory", {
                required: "Land category is required",
              })}
              className={clsx(inputClass, errors.landCategory && errorClass)}
            >
              <option value="">Select Category</option>
              <option value="Agricultural">Agricultural</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            {errors.landCategory && (
              <p className="text-red-500 text-xs mt-1">
                {errors.landCategory.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Area and Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="area"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Total Area <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              id="area"
              {...register("area", {
                required: "Area is required",
                valueAsNumber: true, // This is essential!
                min: { value: 0, message: "Area cannot be negative" },
                validate: (value) =>
                  Number(value) > 0 || "Area must be a positive number",
              })}
              placeholder="e.g., 1200"
              type="number"
              step="any"
              className={clsx(
                inputClass,
                errors.area && errorClass,
                "flex-grow"
              )}
            />
            <select
              {...register("areaUnit", { required: "Area unit is required" })}
              className={clsx(
                inputClass,
                errors.areaUnit && errorClass,
                "w-32"
              )}
            >
              <option value="sqft">sq.ft</option>
              <option value="sqyd">sq.yd</option>
              <option value="sqm">sq.m</option>
              <option value="acres">acres</option>
            </select>
          </div>
          {errors.area && (
            <p className="text-red-500 text-xs mt-1">{errors.area.message}</p>
          )}
          {errors.areaUnit && (
            <p className="text-red-500 text-xs mt-1">
              {errors.areaUnit.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Price <span className="text-red-500">*</span>
          </label>
          <input
            id="price"
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 0, message: "Price cannot be negative" },
              validate: (value) =>
                Number(value) > 0 || "Price must be a positive number",
            })}
            placeholder="e.g., 5000000"
            type="number"
            className={clsx(inputClass, errors.price && errorClass)}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>
      </div>

      {/* Discount, Floors, Parking */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label
            htmlFor="discount"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Discount (%)
          </label>
          <input
            id="discount"
            {...register("discount", {
              valueAsNumber: true,
              min: { value: 0, message: "Discount cannot be negative" },
              max: { value: 100, message: "Discount cannot be more than 100%" },
            })}
            placeholder="e.g., 10"
            type="number"
            className={clsx(inputClass, errors.discount && errorClass)}
          />
          {errors.discount && (
            <p className="text-red-500 text-xs mt-1">
              {errors.discount.message}
            </p>
          )}
        </div>

        {selectedType === "building" && (
          <>
            <div>
              <label
                htmlFor="floors"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Number of Floors
              </label>
              <input
                id="floors"
                {...register("floors", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Floors cannot be negative" },
                })}
                placeholder="e.g., 2"
                type="number"
                className={clsx(inputClass, errors.floors && errorClass)}
              />
              {errors.floors && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.floors.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="parking"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Parking
              </label>
              <input
                id="parking"
                {...register("parking", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Parking spots cannot be negative",
                  },
                })}
                placeholder="e.g., 1"
                type="number"
                className={clsx(inputClass, errors.parking && errorClass)}
              />
              {errors.parking && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.parking.message}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Building Specific Details (Bedrooms, Bathrooms, Property Age, Furnishing) */}
      {selectedType === "building" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="bedrooms"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Bedrooms
            </label>
            <select
              id="bedrooms"
              {...register("bedrooms")}
              className={inputClass}
            >
              <option value="">Select</option>
              {bedroomOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="bathrooms"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Bathrooms
            </label>
            <select
              id="bathrooms"
              {...register("bathrooms")}
              className={inputClass}
            >
              <option value="">Select</option>
              {bathroomOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="propertyAge"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Property Age
            </label>
            <select
              id="propertyAge"
              {...register("propertyAge")}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="New">New</option>
              <option value="<5 Years">&lt; 5 Years</option>
              <option value="5-10 Years">5-10 Years</option>
              <option value=">10 Years">&gt; 10 Years</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="furnishing"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Furnishing
            </label>
            <select
              id="furnishing"
              {...register("furnishing")}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="Unfurnished">Unfurnished</option>
              <option value="Semi-furnished">Semi-furnished</option>
              <option value="Fully-furnished">Fully-furnished</option>
            </select>
          </div>
        </div>
      )}

      {/* Facing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="facing"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Facing
          </label>
          <select id="facing" {...register("facing")} className={inputClass}>
            {facingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Other Details (for buildings) */}
      {selectedType === "building" && (
        <div>
          <label
            htmlFor="otherDetails"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Other Details
          </label>
          <textarea
            id="otherDetails"
            {...register("otherDetails")}
            placeholder="e.g., Amenities, nearby landmarks, or any other relevant information."
            rows={4}
            className={inputClass}
          ></textarea>
        </div>
      )}

      {/* Premium Option */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Add as a Premium?
        </label>
        <div className="flex items-center gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              {...register("isPremium")}
              value="yes"
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              {...register("isPremium")}
              value="no"
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsStep;