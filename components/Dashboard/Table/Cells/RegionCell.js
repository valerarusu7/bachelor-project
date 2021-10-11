function RegionCell({ region, code }) {
  return (
    <div className="flex items-center">
      <span>
        <img className="h-4 w-4 mr-1" src={`https://www.countryflags.io/${code?.toLowerCase()}/shiny/64.png`} />
      </span>
      <span className="font-medium">{region}</span>
    </div>
  );
}

export default RegionCell;
