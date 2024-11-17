import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: 'location',
        label: '🌍 Location',
        options: [
            'Delhi NCR',
            'Bangalore',
            'Hyderabad',
            'Pune',
            'Mumbai',
            'Chennai',
            'Kolkata',
            'Ahmedabad',
            'Jaipur',
            'Lucknow',
        ],
    },
    {
        filterType: 'industry',
        label: '💼 Industry',
        options: [
            'Frontend Developer',
            'Backend Developer',
            'FullStack Developer',
            'Data Scientist',
            'Graphic Designer',
            'Product Manager',
            'Marketing Specialist',
            'Sales Executive',
            'UI/UX Designer',
            'Project Manager',
        ],
    },
    {
        filterType: 'salary',
        label: '💰 Salary',
        options: ['0-3lpa', '3-5lpa', '5-7lpa', '7-10lpa', '10+lpa'],
    },
];

const FilterCard = () => {
    const [filters, setFilters] = useState({
        location: '',
        industry: '',
        salary: '',
    });
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    // Update or toggle the filters dynamically
    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: prevFilters[filterType] === value ? '' : value, // Toggle the filter
        }));
    };

    // Reset all filters and search term
    const resetFilters = () => {
        setFilters({
            location: '',
            industry: '',
            salary: '',
        });
        setSearchTerm('');
        dispatch(setSearchedQuery(''));
    };

    // Dispatch the combined query whenever filters or searchTerm changes
    useEffect(() => {
        const query = `${searchTerm} ${filters.location} ${filters.industry} ${filters.salary}`.trim();
        dispatch(setSearchedQuery(query));
    }, [filters, searchTerm, dispatch]);

    return (
        <div className="w-full bg-white p-5 rounded-lg shadow-md">
            {/* Search Bar */}
            <div className="mb-6">
                <h1 className="font-bold text-lg text-gray-800 mb-2">🔍 Search Jobs</h1>
                <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type job title, keyword, or company..."
                    className="w-full border-gray-300 rounded-md"
                />
            </div>

            {/* Filters */}
            <div>
                <h1 className="font-bold text-xl text-gray-800 mb-4">🛠 Filter Jobs</h1>
                {filterData.map((filter) => (
                    <div key={filter.filterType} className="mb-6">
                        <h2 className="font-semibold text-lg text-gray-700 mb-2">
                            {filter.label}
                        </h2>
                        <RadioGroup
                            value={filters[filter.filterType]}
                            onValueChange={(value) =>
                                handleFilterChange(filter.filterType, value)
                            }
                        >
                            <div
                                className="max-h-28 overflow-y-auto"
                                style={{ scrollbarWidth: 'thin', scrollbarColor: '#ccc transparent' }}
                            >
                                {filter.options.map((option, idx) => {
                                    const itemId = `${filter.filterType}-${idx}`;
                                    return (
                                        <div
                                            key={itemId}
                                            className="flex items-center space-x-2 my-2"
                                        >
                                            <RadioGroupItem
                                                value={option}
                                                id={itemId}
                                                checked={filters[filter.filterType] === option} // Ensure proper toggle state
                                            />
                                            <Label
                                                htmlFor={itemId}
                                                className={`text-gray-600 ${
                                                    filters[filter.filterType] === option
                                                        ? 'font-bold text-indigo-600'
                                                        : ''
                                                }`}
                                            >
                                                {option}
                                            </Label>
                                        </div>
                                    );
                                })}
                            </div>
                        </RadioGroup>
                    </div>
                ))}
            </div>

            {/* Reset Button */}
            <div className="mt-6 flex justify-end">
                <Button
                    onClick={resetFilters}
                    variant="outline"
                    className="text-gray-800 border-gray-400 hover:bg-gray-200"
                >
                    🔄 Reset Filters
                </Button>
            </div>
        </div>
    );
};

export default FilterCard;
