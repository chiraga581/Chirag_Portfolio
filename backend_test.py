#!/usr/bin/env python3
"""
Portfolio Backend API Test Suite
Tests all portfolio API endpoints for functionality and data validation
"""

import asyncio
import aiohttp
import json
import os
from datetime import datetime
from pathlib import Path

# Load environment variables
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent / 'frontend' / '.env')

# Get backend URL from environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://ml-masters-cv.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

class PortfolioAPITester:
    def __init__(self):
        self.session = None
        self.test_results = []
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    def log_test(self, endpoint, status, message, data=None):
        """Log test results"""
        result = {
            'endpoint': endpoint,
            'status': status,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'data': data
        }
        self.test_results.append(result)
        status_symbol = "✅" if status == "PASS" else "❌" if status == "FAIL" else "⚠️"
        print(f"{status_symbol} {endpoint}: {message}")
        if data and status == "FAIL":
            print(f"   Details: {data}")
    
    async def test_endpoint(self, method, endpoint, expected_status=200, payload=None):
        """Generic endpoint tester"""
        url = f"{API_BASE_URL}{endpoint}"
        try:
            if method.upper() == 'GET':
                async with self.session.get(url) as response:
                    status_code = response.status
                    response_data = await response.json()
            elif method.upper() == 'POST':
                headers = {'Content-Type': 'application/json'}
                async with self.session.post(url, json=payload, headers=headers) as response:
                    status_code = response.status
                    response_data = await response.json()
            else:
                raise ValueError(f"Unsupported method: {method}")
                
            return status_code, response_data
            
        except Exception as e:
            return None, str(e)
    
    async def test_skills_endpoint(self):
        """Test GET /api/skills endpoint"""
        print("\n🔍 Testing Skills Endpoint...")
        
        status_code, response = await self.test_endpoint('GET', '/skills')
        
        if status_code is None:
            self.log_test('/api/skills', 'FAIL', f'Connection error: {response}')
            return
            
        if status_code != 200:
            self.log_test('/api/skills', 'FAIL', f'HTTP {status_code}', response)
            return
            
        # Validate response structure
        if not isinstance(response, dict) or 'success' not in response:
            self.log_test('/api/skills', 'FAIL', 'Invalid response structure', response)
            return
            
        if not response.get('success'):
            self.log_test('/api/skills', 'FAIL', 'API returned success=false', response)
            return
            
        data = response.get('data', [])
        if not isinstance(data, list):
            self.log_test('/api/skills', 'FAIL', 'Data is not a list', response)
            return
            
        # Check for expected skill categories
        categories = [skill.get('category') for skill in data if 'category' in skill]
        expected_categories = ['serviceNow', 'technical', 'emerging']
        
        missing_categories = [cat for cat in expected_categories if cat not in categories]
        if missing_categories:
            self.log_test('/api/skills', 'WARN', f'Missing categories: {missing_categories}', {'found': categories})
        else:
            self.log_test('/api/skills', 'PASS', f'All skill categories found: {categories}')
    
    async def test_projects_endpoint(self):
        """Test GET /api/projects endpoint"""
        print("\n🔍 Testing Projects Endpoint...")
        
        status_code, response = await self.test_endpoint('GET', '/projects')
        
        if status_code is None:
            self.log_test('/api/projects', 'FAIL', f'Connection error: {response}')
            return
            
        if status_code != 200:
            self.log_test('/api/projects', 'FAIL', f'HTTP {status_code}', response)
            return
            
        # Validate response structure
        if not isinstance(response, dict) or 'success' not in response:
            self.log_test('/api/projects', 'FAIL', 'Invalid response structure', response)
            return
            
        if not response.get('success'):
            self.log_test('/api/projects', 'FAIL', 'API returned success=false', response)
            return
            
        data = response.get('data', [])
        if not isinstance(data, list):
            self.log_test('/api/projects', 'FAIL', 'Data is not a list', response)
            return
            
        # Check for expected projects
        project_titles = [proj.get('title', '').lower() for proj in data]
        expected_projects = ['fasu', 'arms', 'cancer detection']
        
        found_projects = []
        for expected in expected_projects:
            if any(expected in title for title in project_titles):
                found_projects.append(expected)
        
        if len(found_projects) == len(expected_projects):
            self.log_test('/api/projects', 'PASS', f'All expected projects found: {found_projects}')
        else:
            missing = [proj for proj in expected_projects if proj not in found_projects]
            self.log_test('/api/projects', 'WARN', f'Some projects missing: {missing}', {'found_titles': project_titles})
        
        # Test display_order sorting
        display_orders = [proj.get('display_order', 0) for proj in data if 'display_order' in proj]
        if display_orders == sorted(display_orders):
            self.log_test('/api/projects', 'PASS', 'Projects properly sorted by display_order')
        else:
            self.log_test('/api/projects', 'WARN', 'Projects not sorted by display_order', {'orders': display_orders})
        
        return data  # Return for individual project testing
    
    async def test_project_detail_endpoint(self, projects_data):
        """Test GET /api/projects/{project_id} endpoint"""
        print("\n🔍 Testing Project Detail Endpoint...")
        
        if not projects_data:
            self.log_test('/api/projects/{id}', 'SKIP', 'No projects data available for testing')
            return
            
        # Test with first project
        first_project = projects_data[0]
        project_id = first_project.get('id')
        
        if not project_id:
            self.log_test('/api/projects/{id}', 'FAIL', 'No project ID found in projects data')
            return
            
        status_code, response = await self.test_endpoint('GET', f'/projects/{project_id}')
        
        if status_code is None:
            self.log_test('/api/projects/{id}', 'FAIL', f'Connection error: {response}')
            return
            
        if status_code != 200:
            self.log_test('/api/projects/{id}', 'FAIL', f'HTTP {status_code}', response)
            return
            
        # Validate response structure
        if not isinstance(response, dict) or 'success' not in response:
            self.log_test('/api/projects/{id}', 'FAIL', 'Invalid response structure', response)
            return
            
        if not response.get('success'):
            self.log_test('/api/projects/{id}', 'FAIL', 'API returned success=false', response)
            return
            
        project_data = response.get('data')
        if not project_data:
            self.log_test('/api/projects/{id}', 'FAIL', 'No project data returned', response)
            return
            
        self.log_test('/api/projects/{id}', 'PASS', f'Project detail retrieved for ID: {project_id}')
        
        # Test with invalid project ID
        status_code, response = await self.test_endpoint('GET', '/projects/invalid-id')
        if status_code == 404:
            self.log_test('/api/projects/{id}', 'PASS', 'Correctly returns 404 for invalid project ID')
        else:
            self.log_test('/api/projects/{id}', 'WARN', f'Expected 404 for invalid ID, got {status_code}')
    
    async def test_experience_endpoint(self):
        """Test GET /api/experience endpoint"""
        print("\n🔍 Testing Experience Endpoint...")
        
        status_code, response = await self.test_endpoint('GET', '/experience')
        
        if status_code is None:
            self.log_test('/api/experience', 'FAIL', f'Connection error: {response}')
            return
            
        if status_code != 200:
            self.log_test('/api/experience', 'FAIL', f'HTTP {status_code}', response)
            return
            
        # Validate response structure
        if not isinstance(response, dict) or 'success' not in response:
            self.log_test('/api/experience', 'FAIL', 'Invalid response structure', response)
            return
            
        if not response.get('success'):
            self.log_test('/api/experience', 'FAIL', 'API returned success=false', response)
            return
            
        data = response.get('data', [])
        if not isinstance(data, list):
            self.log_test('/api/experience', 'FAIL', 'Data is not a list', response)
            return
            
        # Check for Infosys positions
        companies = [exp.get('company', '').lower() for exp in data]
        infosys_count = sum(1 for company in companies if 'infosys' in company)
        
        if infosys_count >= 2:
            self.log_test('/api/experience', 'PASS', f'Found {infosys_count} Infosys positions')
        else:
            self.log_test('/api/experience', 'WARN', f'Expected 2+ Infosys positions, found {infosys_count}', {'companies': companies})
        
        # Test display_order sorting
        display_orders = [exp.get('display_order', 0) for exp in data if 'display_order' in exp]
        if display_orders == sorted(display_orders):
            self.log_test('/api/experience', 'PASS', 'Experience properly sorted by display_order')
        else:
            self.log_test('/api/experience', 'WARN', 'Experience not sorted by display_order', {'orders': display_orders})
    
    async def test_education_endpoint(self):
        """Test GET /api/education endpoint"""
        print("\n🔍 Testing Education Endpoint...")
        
        status_code, response = await self.test_endpoint('GET', '/education')
        
        if status_code is None:
            self.log_test('/api/education', 'FAIL', f'Connection error: {response}')
            return
            
        if status_code != 200:
            self.log_test('/api/education', 'FAIL', f'HTTP {status_code}', response)
            return
            
        # Validate response structure
        if not isinstance(response, dict) or 'success' not in response:
            self.log_test('/api/education', 'FAIL', 'Invalid response structure', response)
            return
            
        if not response.get('success'):
            self.log_test('/api/education', 'FAIL', 'API returned success=false', response)
            return
            
        data = response.get('data', [])
        if not isinstance(data, list):
            self.log_test('/api/education', 'FAIL', 'Data is not a list', response)
            return
            
        # Check for expected institutions
        institutions = [edu.get('institution', '').lower() for edu in data]
        expected_institutions = ['drexel', 'hmr institute']
        
        found_institutions = []
        for expected in expected_institutions:
            if any(expected in inst for inst in institutions):
                found_institutions.append(expected)
        
        if len(found_institutions) == len(expected_institutions):
            self.log_test('/api/education', 'PASS', f'All expected institutions found: {found_institutions}')
        else:
            missing = [inst for inst in expected_institutions if inst not in found_institutions]
            self.log_test('/api/education', 'WARN', f'Some institutions missing: {missing}', {'found': institutions})
        
        # Test display_order sorting
        display_orders = [edu.get('display_order', 0) for edu in data if 'display_order' in edu]
        if display_orders == sorted(display_orders):
            self.log_test('/api/education', 'PASS', 'Education properly sorted by display_order')
        else:
            self.log_test('/api/education', 'WARN', 'Education not sorted by display_order', {'orders': display_orders})
    
    async def test_certifications_endpoint(self):
        """Test GET /api/certifications endpoint"""
        print("\n🔍 Testing Certifications Endpoint...")
        
        status_code, response = await self.test_endpoint('GET', '/certifications')
        
        if status_code is None:
            self.log_test('/api/certifications', 'FAIL', f'Connection error: {response}')
            return
            
        if status_code != 200:
            self.log_test('/api/certifications', 'FAIL', f'HTTP {status_code}', response)
            return
            
        # Validate response structure
        if not isinstance(response, dict) or 'success' not in response:
            self.log_test('/api/certifications', 'FAIL', 'Invalid response structure', response)
            return
            
        if not response.get('success'):
            self.log_test('/api/certifications', 'FAIL', 'API returned success=false', response)
            return
            
        data = response.get('data', [])
        if not isinstance(data, list):
            self.log_test('/api/certifications', 'FAIL', 'Data is not a list', response)
            return
            
        self.log_test('/api/certifications', 'PASS', f'Certifications endpoint working, returned {len(data)} items')
        
        # Test display_order sorting
        display_orders = [cert.get('display_order', 0) for cert in data if 'display_order' in cert]
        if display_orders == sorted(display_orders):
            self.log_test('/api/certifications', 'PASS', 'Certifications properly sorted by display_order')
        else:
            self.log_test('/api/certifications', 'WARN', 'Certifications not sorted by display_order', {'orders': display_orders})
    
    async def test_contact_post_endpoint(self):
        """Test POST /api/contact endpoint"""
        print("\n🔍 Testing Contact Form Submission...")
        
        # Test valid contact form submission
        valid_contact = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "Portfolio Inquiry",
            "message": "I'm interested in discussing potential opportunities."
        }
        
        status_code, response = await self.test_endpoint('POST', '/contact', payload=valid_contact)
        
        if status_code is None:
            self.log_test('/api/contact POST', 'FAIL', f'Connection error: {response}')
            return
            
        if status_code != 200:
            self.log_test('/api/contact POST', 'FAIL', f'HTTP {status_code}', response)
            return
            
        # Validate response structure
        if not isinstance(response, dict) or 'success' not in response:
            self.log_test('/api/contact POST', 'FAIL', 'Invalid response structure', response)
            return
            
        if not response.get('success'):
            self.log_test('/api/contact POST', 'FAIL', 'API returned success=false', response)
            return
            
        self.log_test('/api/contact POST', 'PASS', 'Valid contact form submitted successfully')
        
        # Test invalid email format
        invalid_contact = {
            "name": "Jane Doe",
            "email": "invalid-email",
            "subject": "Test",
            "message": "Test message"
        }
        
        status_code, response = await self.test_endpoint('POST', '/contact', payload=invalid_contact)
        if status_code == 422:  # Validation error
            self.log_test('/api/contact POST', 'PASS', 'Correctly validates email format')
        else:
            self.log_test('/api/contact POST', 'WARN', f'Expected validation error for invalid email, got {status_code}')
        
        # Test missing required fields
        incomplete_contact = {
            "name": "Test User"
            # Missing email, subject, message
        }
        
        status_code, response = await self.test_endpoint('POST', '/contact', payload=incomplete_contact)
        if status_code == 422:  # Validation error
            self.log_test('/api/contact POST', 'PASS', 'Correctly validates required fields')
        else:
            self.log_test('/api/contact POST', 'WARN', f'Expected validation error for missing fields, got {status_code}')
    
    async def test_contacts_get_endpoint(self):
        """Test GET /api/contacts endpoint (admin view)"""
        print("\n🔍 Testing Contacts Admin Endpoint...")
        
        status_code, response = await self.test_endpoint('GET', '/contacts')
        
        if status_code is None:
            self.log_test('/api/contacts GET', 'FAIL', f'Connection error: {response}')
            return
            
        if status_code != 200:
            self.log_test('/api/contacts GET', 'FAIL', f'HTTP {status_code}', response)
            return
            
        # Validate response structure
        if not isinstance(response, dict) or 'success' not in response:
            self.log_test('/api/contacts GET', 'FAIL', 'Invalid response structure', response)
            return
            
        if not response.get('success'):
            self.log_test('/api/contacts GET', 'FAIL', 'API returned success=false', response)
            return
            
        data = response.get('data', [])
        if not isinstance(data, list):
            self.log_test('/api/contacts GET', 'FAIL', 'Data is not a list', response)
            return
            
        self.log_test('/api/contacts GET', 'PASS', f'Contacts admin endpoint working, returned {len(data)} contacts')
    
    async def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Portfolio Backend API Tests...")
        print(f"📡 Testing against: {API_BASE_URL}")
        
        # Test all endpoints
        await self.test_skills_endpoint()
        
        projects_data = await self.test_projects_endpoint()
        await self.test_project_detail_endpoint(projects_data)
        
        await self.test_experience_endpoint()
        await self.test_education_endpoint()
        await self.test_certifications_endpoint()
        await self.test_contact_post_endpoint()
        await self.test_contacts_get_endpoint()
        
        # Summary
        print("\n" + "="*60)
        print("📊 TEST SUMMARY")
        print("="*60)
        
        passed = sum(1 for result in self.test_results if result['status'] == 'PASS')
        failed = sum(1 for result in self.test_results if result['status'] == 'FAIL')
        warnings = sum(1 for result in self.test_results if result['status'] == 'WARN')
        
        print(f"✅ Passed: {passed}")
        print(f"❌ Failed: {failed}")
        print(f"⚠️  Warnings: {warnings}")
        print(f"📝 Total Tests: {len(self.test_results)}")
        
        if failed > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if result['status'] == 'FAIL':
                    print(f"   • {result['endpoint']}: {result['message']}")
        
        if warnings > 0:
            print("\n⚠️  WARNINGS:")
            for result in self.test_results:
                if result['status'] == 'WARN':
                    print(f"   • {result['endpoint']}: {result['message']}")
        
        return {
            'passed': passed,
            'failed': failed,
            'warnings': warnings,
            'total': len(self.test_results),
            'results': self.test_results
        }

async def main():
    """Main test runner"""
    async with PortfolioAPITester() as tester:
        results = await tester.run_all_tests()
        
        # Return appropriate exit code
        if results['failed'] > 0:
            print(f"\n💥 Tests completed with {results['failed']} failures")
            return 1
        else:
            print(f"\n🎉 All tests passed! ({results['passed']} passed, {results['warnings']} warnings)")
            return 0

if __name__ == "__main__":
    import sys
    exit_code = asyncio.run(main())
    sys.exit(exit_code)